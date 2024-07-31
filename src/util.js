import { getStorage, ref, listAll } from "firebase/storage";
import * as XLSX from "xlsx";

export const getUserList = async () => {
  const storage = getStorage();
  const listRef = ref(storage, "userdata/pdfs/");
  let userlist = [];

  await listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {});
      res.items.forEach((itemRef) => {
        const [
          company,
          affiliation,
          position,
          name,
          phonenumber,
          course,
          mainType,
          subType,
        ] = itemRef._location.path_.split("/")[2].split(".")[0].split("_");
        userlist.push({
          isChecked: false,
          company,
          affiliation,
          position,
          name,
          phonenumber,
          course,
          mainType,
          subType,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return userlist;
};

export const getCourseList = async () => {
  const storage = getStorage();
  const listRef = ref(storage, "courses/");
  let courselist = [];

  await listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {});
      res.items.forEach((itemRef) => {
        const [name, code, imageurl] = itemRef._location.path_
          .split("/")[1]
          .split(".")[0]
          .split("_");
        const url = imageurl.replace(/\$/g, "/");
        courselist.push({
          name,
          code,
          url,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return courselist;
};

export const fetchData = async (filename) => {
  try {
    const response = await fetch(filename);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    let array = [];
    for (var i = 0; i < workbook.SheetNames.length; i++) {
      const worksheet = workbook.Sheets[workbook.SheetNames[i]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      if (workbook.SheetNames.length === 1) return jsonData;
      else array.push(jsonData);
    }
    return array;
  } catch (error) {
    console.log(error);
  }
};

export const getStoragePath = (body) => {
  return `userdata/pdfs/${body.company}_${body.affiliation}_${body.position}_${body.name}_${body.phonenumber}_${body.course}_${body.mainType}_${body.subType}.pdf`;
};

export const getStorageCoursePath = (body) => {
  return `courses/${body.name}_${body.code}_${body.url.replace(
    /\//g,
    "$"
  )}.png`;
};

export const getFileName = (name) => {
  return `SEAL 진단 결과지_${name}.pdf`;
};
