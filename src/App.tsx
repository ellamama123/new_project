import { useState } from 'react'
import { Badge, Button, ConfigProvider, Drawer, Empty, Input, InputNumber, Modal, Select, Tag, message } from 'antd'
import { AudioOutlined, CameraOutlined, CheckCircleOutlined, DeleteOutlined, HeartFilled, HeartOutlined, LaptopOutlined, SearchOutlined, ShoppingCartOutlined, ThunderboltFilled, TruckOutlined, SafetyCertificateOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import viVN from 'antd/locale/vi_VN'
import { categories, money, photo, products, type Product } from './data/products'
import './App.css'

function Storefront() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [favorites, setFavorites] = useState<number[]>([])
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const [notice, contextHolder] = message.useMessage()
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase()
  const visible = products.filter(p => (category === 'Tất cả' || p.category === category) && normalize(p.name).includes(normalize(query)) && (!onlyFavorites || favorites.includes(p.id))).sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : a.id - b.id)
  const cartProducts = products.filter(p => cart[p.id] > 0)
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const total = cartProducts.reduce((sum, p) => sum + p.price * cart[p.id], 0)
  const add = (p: Product) => {
    setCart(current => ({ ...current, [p.id]: Math.min((current[p.id] || 0) + 1, 99) }))
    notice.success(`Đã thêm ${p.name} vào giỏ hàng`)
  }
  const browse = (next = 'Tất cả') => {
    setCategory(next)
    setOnlyFavorites(false)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }
  return <>
    {contextHolder}
    <div className="announcement">Một chút công nghệ. Nhiều hơn cảm hứng hơn. <span>Miễn phí giao hàng từ 999.000đ</span></div>
    <header className="header">
      <a className="brand" href="#" aria-label="NOVA trang chủ"><span className="brand-icon"><ThunderboltFilled /></span>NOVA<span className="brand-dot">.</span></a>
      <nav aria-label="Điều hướng chính"><button className={!onlyFavorites ? 'nav-active' : ''} onClick={() => browse()}>Cửa hàng</button><button onClick={() => browse('Âm thanh')}>Âm thanh</button><button onClick={() => browse('Phụ kiện')}>Phụ kiện</button></nav>
      <div className="header-actions"><Input className="header-search" prefix={<SearchOutlined />} placeholder="Tìm sản phẩm..." aria-label="Tìm sản phẩm" value={query} allowClear onChange={e => { setQuery(e.target.value); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }} />
        <Badge count={favorites.length} size="small"><Button aria-label="Sản phẩm yêu thích" type={onlyFavorites ? 'primary' : 'text'} icon={<HeartOutlined />} onClick={() => { setOnlyFavorites(v => !v); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }} /></Badge>
        <Badge count={count} size="small"><Button className="cart-trigger" icon={<ShoppingCartOutlined />} onClick={() => setCartOpen(true)}>Giỏ hàng</Button></Badge>
      </div>
    </header>
    <main className="page">
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span /> BỘ SƯU TẬP MỚI 2026</div><h1>Nâng tầm<br />những điều<br /><em>thường ngày.</em></h1><p>Công nghệ tinh tế, trải nghiệm khác biệt.<br />Khám phá những món đồ dành riêng cho bạn.</p><Button size="large" type="primary" onClick={() => browse()}>Khám phá bộ sưu tập</Button><div className="hero-note"><CheckCircleOutlined /> Được chọn lọc cho cuộc sống hiện đại</div></div>
        <div className="hero-visual"><img src={photo('photo-1546435770-a3e426bf472b', 1100)} alt="Tai nghe không dây màu đen trên nền vàng" /><span className="hero-image-label">SOUND MEETS STYLE</span><button className="hero-product" onClick={() => setSelected(products[0])}><span><small>ÂM THANH KHÔNG GIỚI HẠN</small><strong>Studio Wireless</strong></span><span className="hero-product-price">{money(products[0].price)} <PlusOutlined /></span></button></div>
      </section>
      <section className="benefits" aria-label="Cam kết cửa hàng"><div><TruckOutlined /><span><strong>Giao hàng toàn quốc</strong><small>Miễn phí đơn từ 999.000đ</small></span></div><div><SafetyCertificateOutlined /><span><strong>Chất lượng chọn lọc</strong><small>Chăm chút từng sản phẩm</small></span></div><div><ReloadOutlined /><span><strong>Đổi trả trong 7 ngày</strong><small>Mua sắm thêm an tâm</small></span></div><div><CheckCircleOutlined /><span><strong>Hỗ trợ tận tâm</strong><small>Đồng hành cùng bạn</small></span></div></section>
      <section id="products" className="catalog">
        <div className="section-heading"><div><div className="eyebrow">TÌM MÓN ĐỒ BẠN YÊU</div><h2>{onlyFavorites ? 'Danh sách yêu thích' : 'Lựa chọn cho mỗi ngày'}</h2><p>Thiết kế đẹp. Công năng tốt. Giá vừa tầm.</p></div><span className="collection-label">THE EVERYDAY COLLECTION / 2026</span></div>
        <div className="catalog-toolbar"><div className="category-tabs" aria-label="Danh mục">{categories.map(c => <Button key={c} type={category === c ? 'primary' : 'text'} onClick={() => setCategory(c)} icon={c === 'Âm thanh' ? <AudioOutlined /> : c === 'Máy ảnh' ? <CameraOutlined /> : c === 'Laptop' ? <LaptopOutlined /> : undefined}>{c}</Button>)}</div><Select aria-label="Sắp xếp sản phẩm" value={sort} onChange={setSort} options={[{ value: 'featured', label: 'Nổi bật nhất' }, { value: 'low', label: 'Giá: thấp đến cao' }, { value: 'high', label: 'Giá: cao đến thấp' }]} /></div>
        <div className="result-count">{visible.length} sản phẩm {query && <>cho “{query}”</>}{onlyFavorites && <Button size="small" type="link" onClick={() => setOnlyFavorites(false)}>Xem tất cả</Button>}</div>
        {visible.length ? <div className="product-grid">{visible.map(p => <article className="product-card" key={p.id}><div className="product-image" style={{ background: p.color }}><button className="product-photo-button" onClick={() => setSelected(p)} aria-label={`Xem ${p.name}`}><img src={photo(p.image)} alt={p.name} loading="lazy" /></button><Tag className="product-label" color={p.label === 'Mới về' ? 'green' : undefined}>{p.label}</Tag><Button className="favorite-button" shape="circle" aria-label={`${favorites.includes(p.id) ? 'Bỏ' : 'Thêm'} yêu thích ${p.name}`} icon={favorites.includes(p.id) ? <HeartFilled style={{ color: '#d54d58' }} /> : <HeartOutlined />} onClick={() => setFavorites(current => current.includes(p.id) ? current.filter(id => id !== p.id) : [...current, p.id])} /></div><div className="product-info"><span className="product-category">{p.category}</span><button className="product-name" onClick={() => setSelected(p)}>{p.name}</button><div className="product-bottom"><div><strong>{money(p.price)}</strong><del>{money(p.originalPrice)}</del></div><Button aria-label={`Thêm ${p.name} vào giỏ hàng`} icon={<PlusOutlined />} onClick={() => add(p)} /></div></div></article>)}</div> : <div className="empty-state"><Empty description="Chưa tìm thấy sản phẩm phù hợp" /><Button onClick={() => { setQuery(''); setCategory('Tất cả'); setOnlyFavorites(false) }}>Xóa bộ lọc</Button></div>}
      </section>
      <section className="bottom-banner"><div><span className="eyebrow">ÍT HƠN, NHƯNG TỐT HƠN</span><h2>Một góc làm việc.<br />Thêm nhiều cảm hứng.</h2><p>Những phụ kiện nhỏ tạo nên sự khác biệt lớn.</p></div><Button size="large" onClick={() => browse('Phụ kiện')}>Khám phá phụ kiện</Button></section>
    </main>
    <footer><a className="brand" href="#">NOVA.</a><p>Công nghệ cho cuộc sống của bạn.</p><span>Giao diện mẫu · Sản phẩm và giá mang tính minh họa</span></footer>
    <Drawer title={`Giỏ hàng của bạn (${count})`} open={cartOpen} onClose={() => setCartOpen(false)} footer={cartProducts.length > 0 && <div className="cart-footer"><div><span>Tạm tính</span><strong>{money(total)}</strong></div><p>Phí giao hàng được tính khi đặt hàng.</p><Button type="primary" block size="large" onClick={() => Modal.info({ title: 'Đây là cửa hàng demo', content: 'Giỏ hàng đã hoạt động trên giao diện. Chức năng đặt hàng và thanh toán thực tế sẽ được kết nối với backend ở bước tiếp theo.', okText: 'Đã hiểu' })}>Tiếp tục đặt hàng</Button></div>}>
      {!cartProducts.length ? <Empty description="Giỏ hàng đang trống"><Button type="primary" onClick={() => { setCartOpen(false); browse() }}>Khám phá sản phẩm</Button></Empty> : cartProducts.map(p => <div className="cart-item" key={p.id}><img src={photo(p.image, 160)} alt={p.name} /><div><strong>{p.name}</strong><p>{money(p.price)}</p><InputNumber aria-label={`Số lượng ${p.name}`} min={1} max={99} value={cart[p.id]} onChange={v => setCart(current => ({ ...current, [p.id]: v ?? 1 }))} /></div><Button type="text" danger icon={<DeleteOutlined />} aria-label={`Xóa ${p.name}`} onClick={() => setCart(current => { const next = { ...current }; delete next[p.id]; return next })} /></div>)}
    </Drawer>
    <Modal title={selected?.name} open={!!selected} onCancel={() => setSelected(null)} footer={selected && <Button type="primary" icon={<ShoppingCartOutlined />} onClick={() => add(selected)}>Thêm vào giỏ hàng</Button>}>{selected && <div className="product-detail"><img src={photo(selected.image)} alt={selected.name} /><Tag>{selected.category}</Tag><p>{selected.description}</p><h2>{money(selected.price)}</h2><p className="demo-note">Thông tin và ảnh minh họa cho giao diện mẫu.</p></div>}</Modal>
  </>
}

export default function App() {
  return <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: '#234d40', colorText: '#202b27', borderRadius: 8, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: 14, controlHeight: 40 } }}><Storefront /></ConfigProvider>
}
