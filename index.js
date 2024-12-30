const express = require('express')
const cors = require('cors')
const fs = require('fs')
const ytdl = require("@distube/ytdl-core");

const app = express()
app.use(express.json())
app.use(cors({
	origin: '*',
	credentials: true
}))

app.post('/download', async(req, res) => {
	
	try {

		const { url } = req.body

		const videoID = await ytdl.getURLVideoID(url)

		let info = await ytdl.getInfo(url);

		return res.status(200).json({
			status: 'Success',
			message: `Download successful`,
			data: {
				url: `https://www.youtube.com/embed/videoID`,
				info: info?.formats
			}
		})



	} catch (err) {
		console.log(err)

		res.status(500).json({
			status: 'Failed',
			error: err
		})
	}
})


app.listen('8000', () => {
	console.log('Server running on Port 8000')
})