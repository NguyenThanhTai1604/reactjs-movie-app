export default function Footer() {
    return (
        <footer className="bg-black text-white py-10 px-4 mt-10 border-t border-gray-700">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8  ">

                <div>
                    <h3 className="text-red-600 font-bold text-xl mb-4">MOVIE</h3>
                    <p className="text-sm text-gray-300">
                        Trang web xem thông tin phim trực tuyến với trailer, mô tả, đánh giá và nhiều nội dung hấp dẫn khác.
                    </p>
                </div>


                <div>
                    <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>
                            <a href="#" className="hover:text-white transition">Trang chủ</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">Giới thiệu</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">Liên hệ</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">Điều khoản</a>
                        </li>
                    </ul>
                </div>


                <div>
                    <h4 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h4>
                    <div className="flex space-x-4 text-gray-400 text-xl">
                        <a href="#" className="hover:text-white transition">🌐</a>
                        <a href="#" className="hover:text-white transition">📘</a>
                        <a href="#" className="hover:text-white transition">🐦</a>
                        <a href="#" className="hover:text-white transition">📷</a>
                    </div>
                </div>
            </div>


            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Movie App. All rights reserved.
            </div>
        </footer>
    );
}
