import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<{ isThumbnail?: boolean }> = ({ isThumbnail = true }) => {
  const size = isThumbnail ? 60 : 160;

  return (
    <div className={`${!isThumbnail ? 'flex items-center gap-2 justify-start' : ''}`} >
      <Image
        src="/images/logo/trendix_logo_thumb.png"
        alt="logo"
        width={size}
        height={size}
        quality={100}
      />
      {!isThumbnail && <p className="font-bold text-2xl">Login</p>}
    </div>
  );
};

export default Logo;
