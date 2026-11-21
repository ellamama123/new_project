export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  image: string
  label: string
  color: string
  description: string
}

export const products: Product[] = [
  { id: 1, name: 'Tai nghe Studio Wireless', category: 'Âm thanh', price: 1890000, originalPrice: 2490000, image: 'photo-1546435770-a3e426bf472b', label: 'Bán chạy', color: '#eef1f5', description: 'Thiết kế ôm tai thoải mái, âm thanh sống động và kết nối không dây cho những giờ làm việc đầy cảm hứng.' },
  { id: 2, name: 'Bàn phím Mechanical K8', category: 'Phụ kiện', price: 1290000, originalPrice: 1590000, image: 'photo-1587829741301-dc798b83add3', label: 'Giá tốt', color: '#f0f2ed', description: 'Bàn phím cơ nhỏ gọn với cảm giác gõ rõ ràng, phù hợp cho góc làm việc tối giản của bạn.' },
  { id: 3, name: 'Máy ảnh Pocket Classic', category: 'Máy ảnh', price: 8490000, originalPrice: 8990000, image: 'photo-1516035069371-29a1b244cc32', label: 'Mới về', color: '#f3efeb', description: 'Ghi lại những khoảnh khắc thường ngày với thiết kế cổ điển, dễ mang theo trong mỗi chuyến đi.' },
  { id: 4, name: 'Loa Bluetooth Everyday', category: 'Âm thanh', price: 790000, originalPrice: 990000, image: 'photo-1608043152269-423dbba4e7e1', label: 'Giá tốt', color: '#edf2f2', description: 'Một chiếc loa nhỏ cho playlist yêu thích. Kết nối Bluetooth tiện lợi và thiết kế dễ di chuyển.' },
  { id: 5, name: 'Laptop Air 14', category: 'Laptop', price: 18990000, originalPrice: 20990000, image: 'photo-1496181133206-80ce9b88a853', label: 'Nổi bật', color: '#f0f0f4', description: 'Không gian làm việc linh hoạt trong một thiết kế mỏng nhẹ, dành cho học tập và sáng tạo mỗi ngày.' },
  { id: 6, name: 'Chuột không dây Precision', category: 'Phụ kiện', price: 590000, originalPrice: 790000, image: 'photo-1527814050087-3793815479db', label: 'Bán chạy', color: '#f2f1ee', description: 'Thiết kế vừa tay, thao tác chính xác và kết nối không dây giúp bàn làm việc luôn gọn gàng.' },
]
export const categories = ['Tất cả', 'Âm thanh', 'Phụ kiện', 'Máy ảnh', 'Laptop']
export const money = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
export const photo = (id: string, width = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
