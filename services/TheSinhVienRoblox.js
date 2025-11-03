const sharp = require('sharp');

/**
 * Hàm tạo ảnh thẻ sinh viên Roblox
 * @param {object} data - Dữ liệu cần thiết (ten, lop, avatar_url, ...)
 * @returns {Buffer} - Trả về Buffer chứa ảnh PNG/JPEG đã tạo
 */
async function createImage(data) {
    const { ten, lop } = data; // Giả sử nhận Tên và Lớp qua body
    
    // Vcl: Đây là LOGIC xử lý ảnh phức tạp của huynh
    // (Tải ảnh nền, tải avatar, ghép chữ, resize...)
    
    // Tạm thời, tui tạo 1 ảnh màu xanh dương đậm Roblox làm ví dụ nha.
    const imageBuffer = await sharp({
        create: {
            width: 800,
            height: 500,
            channels: 3,
            background: { r: 0, g: 150, b: 255 } // Màu xanh tươi
        }
    })
    .composite([
        {
            // Thêm chữ Tên: ...
            input: Buffer.from(`<svg><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white">Thẻ SV Roblox của ${ten} - Lớp ${lop}</text></svg>`),
            left: 0,
            top: 0
        }
    ])
    .png()
    .toBuffer();
    
    console.log(`Đã tạo ảnh cho thẻ SV của ${ten} :))`);
    return imageBuffer;
}

// Quan trọng VCL: Export hàm ra để router gọi
module.exports = {
    createImage 
};
