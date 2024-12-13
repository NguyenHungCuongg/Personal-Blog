import { useEffect, useRef } from "react";
import { assets } from "../assets/assets";

function BannerImage(Props) {
  const imgRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (imgRef.current) {
        imgRef.current.style.height = `${imgRef.current.offsetWidth / 2}px`;
      }
    };

    // Update height on initial render
    updateHeight();

    // Update height on window resize
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  //Các hàm trên giúp cập nhật chiều cao của ảnh banner theo tỉ lệ 2:1
  return (
    <img
      ref={imgRef}
      className="img-fluid rounded"
      src={Props.bannerImageUrl || assets.defaultbanner}
      alt="Banner"
      style={{ width: "100%", objectFit: "cover" }}
    />
  );
}

export default BannerImage;
