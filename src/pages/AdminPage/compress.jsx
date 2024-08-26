import axios from "axios";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

export const Compress = async (blob) => {
  const file = new File([blob], "document.pdf", { type: "application/pdf" });
  if (file)
    try {
      const token = await getAccessToken();
      const { uploadUri, assetID } = await getUploadUri(token);
      await uploadFile(uploadUri, file);
      const location = await createCompressJob2(token, assetID);
      let jobStatus = "in progress";

      while (jobStatus === "in progress") {
        const statusResponse = await pollJobStatus(token, location);
        jobStatus = statusResponse.status;
        console.log(jobStatus);

        if (jobStatus === "done") {
          await downloadFile(statusResponse.asset.downloadUri);
        } else if (jobStatus === "failed") {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error("Error during PDF processing:", error);
    }
};

const ConvertPdf = async (assetID, accessToken, element) => {
  console.log(element);

  try {
    const response = await axios({
      method: "post",
      url: "https://pdf-services.adobe.io/operation/htmltopdf",
      headers: {
        "X-API-Key": client_id,
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json",
      },
      body: {
        assetID: assetID,
        json: {},
        // JSON.stringify(jsonOutput, null, 2),
        includeHeaderFooter: true,
        pageLayout: {
          pageWidth: 11,
          pageHeight: 8.5,
        },
        notifiers: [
          {
            type: "CALLBACK",
            data: {
              url: "https://dummy.callback.org/",
              headers: {
                "X-API-Key": client_id,
                "access-token": `Bearer ${accessToken}`,
              },
            },
          },
        ],
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getAccessToken = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://pdf-services.adobe.io/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
      }),
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

const getUploadUri = async (accessToken) => {
  try {
    const response = await axios.post(
      "https://pdf-services.adobe.io/assets",
      {
        mediaType: "application/pdf",
      },
      {
        headers: {
          "X-API-Key": client_id,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error getting upload URI:", error);
  }
};

const uploadFile = async (uploadUri, file) => {
  const response = await fetch(uploadUri, {
    method: "put",
    headers: {
      "Content-Type": "application/pdf",
    },
    body: file,
  });
  if (!response.ok) throw new Error("Failed to upload file");
  return true;
};

const createCompressJob2 = async (accessToken, assetID) => {
  try {
    const response = await fetch(
      "https://pdf-services.adobe.io/operation/compresspdf",
      {
        method: "post",
        headers: {
          "x-api-key": client_id,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assetID: assetID,
          compressionLevel: "LOW",
          notifiers: [
            {
              type: "CALLBACK",
              data: {
                url: "https://www.naver.com",
                headers: {
                  "x-api-key": client_id,
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const location = response.headers.get("Location");
    return response.headers.get("Location");
  } catch (err) {
    console.log(err);
  }
};

const pollJobStatus = async (accessToken, location) => {
  const response = await fetch(location, {
    method: "get",
    headers: {
      "X-API-Key": client_id,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
  // const data = await response.json();
  // console.log("Full Response:", data); // 전체 응답 출력
  // const jobStatus = data.status; // status 필드 접근
  // console.log(jobStatus);
  // console.log(response.headers);
  // console.log(response.headers.get("content-type"));
  // if (!response.ok) throw new Error("Failed to get job status");
  // const data = await response.json();
  // return data;
};

const downloadFile = async (downloadUri) => {
  const response = await fetch(downloadUri, {
    method: "get",
  });

  if (!response.ok) throw new Error("Failed to download file");
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "compressedPDF.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

const getDownloadUri = async (assetID, accessToken) => {
  const response = await fetch(
    `https://pdf-services.adobe.io/assets/${assetID}`,
    {
      method: "get",
      headers: {
        "X-API-Key": client_id,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to download file");
  const data = await response.json();
  return data;
};
