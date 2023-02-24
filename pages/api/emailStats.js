export default async function handler(req, res) {
  const browser = await puppeteer.launch(); // default is true
  const page = await browser.newPage();
  await page.emulate(iPhone);

  console.info("going to vercel...");

  const website_url =
    "https://vercel.com/ronrupp/colinhadler/analytics/audience?period=30d";
  await page.goto(website_url, { waitUntil: "networkidle0" });

  console.info("logging into github...");

  await page.waitForSelector('[data-testid="login/github-button"]');
  await page.click('[data-testid="login/github-button"]');

  browser.on("targetcreated", async (target) => {
    if (target.type() === "page") {
      // if it tab/page
      const page = await target.page(); // declare it
      await page.waitForSelector('input[name="login"]');
      await page.type('input[name="login"]', "ronaldrupp");

      await page.waitForSelector('input[name="password"]');
      await page.type('input[name="password"]', "xeqbof-0xicne-pefrIn");

      await page.evaluate(() => {
        document.querySelector("input[type=submit]").click();
      });
    }
  });

  await page.waitForSelector(".analytics-navigation-tabs_tabs-wrapper__t79uc");

  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  console.info("taking screenshot");

  await page.screenshot({
    path: "screenshot.jpg",
    fullPage: true,
  });

  await browser.close();

  console.info("sending email...");
  const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: "ronald.rupp@outlook.at",
      pass: "nystos-Sukfos-pomze6",
    },
  });

  const options = {
    from: "ronald.rupp@outlook.at",
    to: "ron.rupp@icloud.com", //colin.hadler@gmail.com
    bcc: "",
    subject: "colinhadler.at - Stats",
    text: "Hey Colin! \nEin neuer Monat und neue Zahlen.\n\nAnbei die Statistik der letzen 30 Tage von deiner Website :)\n\n\nbtw - das ist ne Bot-Mail, also automatisch generiert. Nicht, dass du dich wunderst warum du gegen Mitternacht noch ne Mail von mir bekommst haha :)",
    attachments: [
      {
        path: "./screenshot.jpg", // stream this file
      },
    ],
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      fs.appendFile("latest error", `${error}`, function (err) {
        if (err) throw err;
      });
    } else console.info(`sucessfully sent to ${info.accepted.join(", ")}`);
  });

  res.status(200).end("Hello Cron!");
}
