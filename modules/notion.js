const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

async function createView({ geo, page, ua }) {
  let res;
  try {
    res = await notion.pages.create({
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
                content: page,
              },
            },
          ],
        },
        Location: {
          rich_text: [
            {
              text: {
                content: `${geo.city ? geo.city : ''}, ${geo.country ? geo.country : ''}`,
              },
            },
          ],
        },
        Device: {
          rich_text: [
            {
              text: {
                content: `${ua.device.vendor ? ua.device.vendor : ''}, ${ua.device.model ? ua.device.model : ''}, ${ua.os.name ? ua.os.name : ''}, ${ua.os.version ? ua.os.version : ''},`,
              },
            },
          ],
        },
        RawUserAgentInfo: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(ua)
              }
            }
          ]
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
  catch (err) {
    console.log(err)
  }
  console.log(res)
}

export default createView;
