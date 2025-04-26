import { HelmetProvider, Helmet } from "react-helmet-async";
import { ReactNode } from "react";

interface SEOProps {
  title?: string;
  description?: string;
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
  children,
}) => {
  // Construct full title with brand name if not already included
  const fullTitle = title.includes("OMNIS") ? title : `${title} | OMNIS`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {children}
    </Helmet>
  );
};

export default SEO;
