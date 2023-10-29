import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: <span>SendMail API Docs</span>,
  project: {
    link: 'https://github.com/ahmed0saber/sendmail-api',
  },
  docsRepositoryBase: 'https://github.com/ahmed0saber/sendmail-api',
  footer: {
    text: 'SendMail API Docs',
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s | SendMail API Docs'
      }
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="SendMail API Docs" />
      <meta property="og:description" content="SendMail API is a simple API that enables you to send emails to yourself or anyone else." />
    </>
  ),
}

export default config
