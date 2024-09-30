import Link from "next/link";
import { RichText } from "prismic-reactjs";

export default function Footer({ data }) {
  return (
    <div className="bg-black text-white py-8">
      <div className="mx-auto px-4 max-w-screen-xl grid grid-cols-2">
        <ul className="flex flex-col items-start">
          {data.node.sitemap.map((site) => (
            <Link
                className="font-bold text-lg"
              href={site.interne_seite._meta.uid}
              key={site.interne_seite._meta.uid}
            >
              <a className="underlined-link">{RichText.render(site.seitennamen)}</a>
            </Link>
          ))}
        </ul>
          <ul className="flex flex-col items-start">
            {data.node.legal_notice.map((site) => (
              <li key={site.interne_seiten._meta.uid}>
                <Link href={site.interne_seiten._meta.uid}>
                  <a className="underlined-link">{RichText.render(site.seitennamen)}</a>
                </Link>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}
