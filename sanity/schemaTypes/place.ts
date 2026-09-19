export const placeType = {
  name: "place",
  title: "Place",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required().min(2),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "overratedSpots",
      title: "Overrated Spots",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "hiddenGems",
      title: "Hidden Gems",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "bestTimeToVisit",
      title: "Best Time To Visit",
      type: "string",
    },
    {
      name: "localFood",
      title: "Local Food",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "travelTips",
      title: "Travel Tips",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
