export default {
  name: "skills",
  title: "Skills",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "bgColor",
      title: "BgColor",
      type: "colorlist", // sanity install color-list
      options: {
        list: [
          { title: "Default", value: "#edf2f8" },
          { title: "Red", value: "#f16d70" },
          { title: "Teal", value: "#88c6db" },
          { title: "Purple", value: "#aca0cc" },
          { title: "Green", value: "#bdcdcb" },
          { title: "White", value: "white" },
        ],
      },
    },
    {
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
