const express = require('express');
const router = express.Router();

// 🤯 Khai báo tất cả Tool vào đây 🤯
// Thêm tool mới, chỉ cần thêm 1 dòng vào object này!
const TOOL_MAP = {
    // ID Tool: Hàm xử lý ảnh từ file services tương ứng
    "the_sinh_vien_roblox": require('../services/TheSinhVienRoblox').createImage,
    // "avatar_meme": require('../services/AvatarMeme').createImage, // Tool 2
};

// --- API CHUNG: POST /apitaoanh ---
router.post('/', async (req, res) => {
    // 🤓 Lấy tool_id từ body request 🤓
    const { tool_id, ...tool_data } = req.body;
    
    // Check Tool có tồn tại không
    if (!tool_id || !TOOL_MAP[tool_id]) {
        return res.status(400).send({ message: "Vcl, không tìm thấy ID Tool này ní. Check lại đi bro." });
    }

    try {
        // 🚀 Gọi hàm xử lý ảnh TƯƠNG ỨNG 🚀
        const toolFunction = TOOL_MAP[tool_id];
        const finalImageBuffer = await toolFunction(tool_data); 
        
        // Trả về ảnh: Set header đúng và send buffer
        res.type('image/png').send(finalImageBuffer);
        
    } catch (error) {
        console.error(`Lỗi vcl khi chạy Tool [${tool_id}]:`, error);
        res.status(500).send({ message: `Lỗi nội bộ khi tạo ảnh. Huynh xem lại code Tool [${tool_id}] đi :((` });
    }
});

module.exports = router;
