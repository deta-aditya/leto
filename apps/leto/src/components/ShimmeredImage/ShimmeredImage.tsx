import { ImgHTMLAttributes, useState } from "react";
import classNames from "classnames";

type ShimmeredImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  shimmerClassName?: string; 
};

type OnLoadParameters = Parameters<NonNullable<ShimmeredImageProps['onLoad']>>;

function ShimmeredImage({ shimmerClassName, ...imgProps }: ShimmeredImageProps) {

  const [loadingImage, setLoadingImage] = useState(true);
  

  const handleLoadImage = (...params: OnLoadParameters) => {
    setLoadingImage(false);
    imgProps.onLoad?.(...params);
  };

  return (
    <>
      <div 
        className={classNames(
          shimmerClassName, 
          "animate-pulse bg-slate-200", 
          {
            hidden: !loadingImage
          }
        )} 
      />
      <img 
        {...imgProps}
        className={classNames(imgProps.className, {
          hidden: loadingImage
        })}
        onLoad={handleLoadImage} 
      />
    </>
  )
}

export default ShimmeredImage;
