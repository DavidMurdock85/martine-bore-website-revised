// Importing Next.js NextApiResponse type from 'next' package
import { NextApiResponse } from 'next';

// URL for external data
const EXTERNAL_DATA_URL = '';

// Function to generate the XML sitemap
function generateSiteMap(posts: { id: number }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc></loc>
     </url>
     <url>
       <loc></loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

// Default component for the sitemap
export default function SiteMap() {
  return null; // Placeholder component
}

// Server-side function to get the sitemap data
export async function getServerSideProps({ res }: { res: NextApiResponse }) {

  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');

  // We send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
