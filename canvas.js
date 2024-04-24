const express = require('express');
const { createCanvas, loadImage, registerFont } = require('canvas');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const moment = require('moment-timezone');

const app = express();
const cacheFolderPath = path.join(__dirname, 'cache');

app.get('/welcome', async (req, res) => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/SECRETHUMANCHORU/imgrandom/main/welcome.json');
        const { imgsnight, imgsday } = response.data;

        const philippinesTime = moment.tz('Asia/Manila');
        const hour = philippinesTime.hour();
        const bgUrls = (hour >= 18 || hour < 6) ? imgsnight : imgsday;
        const bg = bgUrls[Math.floor(Math.random() * bgUrls.length)];

        const fontFilePath = path.join(cacheFolderPath, 'Play-Bold.ttf');

        const { fbid, wc, fullname, link, member } = req.query;
        if (!fbid || !wc || !fullname || !link || !member)
            return res.status(400).json({ error: 'Missing data' });

        if (!await fse.pathExists(fontFilePath)) {
            const fontUrl = 'https://drive.google.com/u/0/uc?id=1a2d5TV4bnteJHNwISGjpiDyy_gA6lwiI&export=download';
            const fontData = (await axios.get(fontUrl, { responseType: 'arraybuffer' })).data;
            await fse.writeFile(fontFilePath, Buffer.from(fontData, 'utf-8'));
        }

        const canvas = createCanvas(612, 306);
        const ctx = canvas.getContext('2d');

        const background = await loadImage(bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
         const avatar = await loadImage(`https://graph.facebook.com/${fbid}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
        ctx.save();
        ctx.beginPath();
        ctx.arc(165, 150, 50, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 115, 100, 100, 100);
        ctx.restore();

        registerFont(fontFilePath, { family: 'Play-Bold' });
        ctx.font = '20px Play-Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`WELCOME TO ${wc.toUpperCase()}`, 400, 118);
        ctx.font = '18px Play-Bold';
        ctx.fillText(fullname, 400, 150);
        ctx.font = '13px Play-Bold';
        ctx.fillText(link, 310, 255);
        ctx.font = '18px Play-Bold';
        ctx.fillText(`MEMBER GROUP CHAT: ${member}`, 400, 210);
        ctx.font = '18px Play-Bold';
        ctx.fillText(fbid, 400, 180);

        const imageBuffer = canvas.toBuffer();
        const pathImg = path.join(__dirname, "cache/welcome.gif");
        await fse.writeFile(pathImg, imageBuffer);
        res.sendFile(pathImg);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.get('/goodbye', async (req, res) => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/SECRETHUMANCHORU/imgrandom/main/welcome.json');
        const { imgsnight, imgsday } = response.data;

        const philippinesTime = moment.tz('Asia/Manila');
        const hour = philippinesTime.hour();
        const bgUrls = (hour >= 18 || hour < 6) ? imgsnight : imgsday;
        const bg = bgUrls[Math.floor(Math.random() * bgUrls.length)];

        const cacheFolderPath = path.join(__dirname, 'cache');
        const fontFilePath = path.join(cacheFolderPath, 'Play-Bold.ttf');

        const { fbid, gb, fullname, link, member } = req.query;
        if (!fbid || !gb || !fullname || !link || !member)
            return res.status(400).json({ error: 'Missing data' });

        const canvas = createCanvas(612, 306);
        const ctx = canvas.getContext('2d');

        const background = await loadImage(bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatar = await loadImage(`https://graph.facebook.com/${fbid}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
        ctx.save();
        ctx.beginPath();
        ctx.arc(165, 150, 50, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 115, 100, 100, 100);
        ctx.restore();

        registerFont(fontFilePath, { family: 'Play-Bold' });
        ctx.font = '20px Play-Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`GOODBYE TO ${gb.toUpperCase()}`, 400, 118);
        ctx.font = '18px Play-Bold';
        ctx.fillText(fullname, 400, 150);
        ctx.font = '13px Play-Bold';
        ctx.fillText(link, 310, 255);
        ctx.font = '18px Play-Bold';
        ctx.fillText(`MEMBER GROUP CHAT: ${member}`, 400, 210);
        ctx.font = '18px Play-Bold';
        ctx.fillText(fbid, 400, 180);
        ctx.font = '23px Play-Bold';
        ctx.fillText(`GOODBYE`, 310, 70);

        const imageBuffer = canvas.toBuffer();
        const pathImg = path.join(__dirname, "cache/goodbye.gif");
        await fse.writeFile(pathImg, imageBuffer);
        res.sendFile(pathImg);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.get('/rankup', async (req, res) => {
    try {
        const cacheFolderPath = path.join(__dirname, 'cache');
        const fontFilePath = path.join(cacheFolderPath, 'Play-Bold.ttf');

        const { word, fbid, wc, fullname, link, Level } = req.query;
        if (!word || !fbid || !wc || !fullname || !link || !Level)
            return res.status(400).json({ error: 'Missing data' });

        const canvas = createCanvas(612, 306);
        const ctx = canvas.getContext('2d');

        const bgUrls = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_U78es8L8PEWVTWvu_9XbOhHaDrp8XS3BQ&usqp=CAU"];
        const bg = bgUrls[Math.floor(Math.random() * bgUrls.length)];

        const background = await loadImage(bg);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatarUrl = fbid;
        const avatar = await loadImage(avatarUrl);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.drawImage(avatar, 115, 100, 100, 100);
        ctx.strokeRect(115, 100, 100, 100);

        registerFont(fontFilePath, { family: 'Play-Bold' });
        ctx.font = '20px Play-Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`RANKUP TO ${wc.toUpperCase()}`, 400, 118);
        ctx.font = '18px Play-Bold';
        ctx.fillText(fullname, 400, 150);
        ctx.font = '13px Play-Bold';
        ctx.fillText(link, 310, 255);
        ctx.font = '18px Play-Bold';
        ctx.fillText(`LEVEL USER: ${Level}`, 400, 210);
        ctx.font = '18px Play-Bold';
        ctx.fillText(fbid, 400, 180);
        ctx.font = '23px Play-Bold';
        ctx.fillText(`RANKUP`, 310, 70);

        const imageBuffer = canvas.toBuffer();
        const pathImg = path.join(__dirname, "cache/rankup.gif");
        await fse.writeFile(pathImg, imageBuffer);
        res.sendFile(pathImg);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
