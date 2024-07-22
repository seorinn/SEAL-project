import { getStorage, ref, listAll } from "firebase/storage";

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
