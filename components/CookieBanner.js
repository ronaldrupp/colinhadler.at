import { useCookies } from "react-cookie";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import styled from "styled-components";

export default function CookieBanner() {
  const [cookies, setCookie] = useCookies(["COOKIES_ALLOWED"]);
  function handleCookie(isAllowed) {
    const today = new Date();
    const nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    setCookie("COOKIES_ALLOWED", isAllowed, {
      path: "/",
      expires: nextweek,
      sameSite: "strict",
    });
  }

  return (
    <>
      <AnimatePresence>
        {!cookies.COOKIES_ALLOWED && (
          <InnerContainer
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {/* <button className={styles.hideBtn}>X</button> */}
              <Title>🍪 Cookie</Title>
              <p>
                Neben technisch notewendigen Cookies verwendet diese Webseite
                auch statistische Cookies (Google Analytics).
              </p>
              <Actions>
                <Button onClick={() => handleCookie(false)} rejectStyle>
                  ablehnen
                </Button>
                <Button onClick={() => handleCookie(true)}>akzeptieren</Button>
              </Actions>
            </div>
          </InnerContainer>
        )}
      </AnimatePresence>
      {cookies.COOKIES_ALLOWED === "true" ? (
        <>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-8J7PHHVJF0"
          ></Script>
          <Script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8J7PHHVJF0', { page_path: window.location.pathname });
            `,
            }}
          />
        </>
      ) : null}
    </>
  );
}

const InnerContainer = styled(motion.div)`
  background-color: white;
  width: 350px;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 2rem;
  border-radius: 0.25rem;
  border: 1px solid gray;
  z-index: 999;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

const Content = styled.div``;
const Title = styled.h1`
  margin: 0;
  font-size: 1.25rem;
`;
const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  background-color: ${({ rejectStyle }) =>
    rejectStyle ? "transparent" : "var(--primary-color)"};
  padding: 1rem;
  border-radius: 0.25rem;
  color: ${({ rejectStyle }) =>
    rejectStyle ? "black" : "white"};
  font-weight: 700;
  width: 100%;
  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.8);
  }
`;
