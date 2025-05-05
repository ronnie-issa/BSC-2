import { HelmetProvider, Helmet } from "react-helmet-async";
import { ReactNode } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  children?: ReactNode;
}

export const SEOProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};

export const SEO: React.FC<SEOProps> = ({
  title = "OMNIS | True in Form",
  description = "OMNIS - A high-end streetwear brand blending minimalist design with uncompromising quality",
  image = "/images/og/og-image.jpg",
  children,
}) => {
  // Construct full title with brand name if not already included
  const fullTitle = title.includes("OMNIS") ? title : `${title} | OMNIS`;

  // Get the current URL for canonical link and og:url
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}
    </Helmet>
  );
};

export default SEO;
