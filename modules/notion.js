const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

async function createView({ geo, page, ua}) {
  await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      DateTime: {
        date: { start: new Date() },
      },
      Page: {
        rich_text: [
          {
            text: {
              content: page.name,
            },
          },
        ],
      },
      Location: {
        rich_text: [
          {
            text: {
              content: `${geo.city}, ${geo.country}`,
            },
          },
        ],
      },
      Device: {
        rich_text: [
          {
            text: {
              content: `${ua.device.vendor}, ${ua.device.model}`,
            },
          },
        ],
      },
      DateAndTime: {
        title: [
          {
            text: {
              content: new Date(),
            },
          },
        ],
      },
    },
  });
}

export default createView;
