import toast from "react-hot-toast";
export const notify = (itemToAdd: string) => {
  toast.success(`Añadido ${itemToAdd}`, {
    style: {
      border: "1px solid #252525",
      padding: "5px",
      color: "#252525",
    },
    iconTheme: {
      primary: "#252525",
      secondary: "#FFFAEE",
    },
  });
};
export const notifyError = (text: string) => {
  toast.error(text);
};
