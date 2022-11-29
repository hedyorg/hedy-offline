import MD from 'markdown-to-jsx'
import { useRef } from 'react'

interface MarkdownType {
  content: string
}

const Markdown: React.FC<MarkdownType> = (props) => {
  let content = props.content
  content = content.replaceAll('{', '')
  content = content.replaceAll('}', '')

  return (
    <MD
      options={{
        overrides: {
          h1: { component: Headline1 },
          h2: { component: Headline2 },
          h3: { component: Headline3 },
          pre: { component: Pre },
          code: { component: Code },
        },
      }}
    >
      {content}
    </MD>
  )
}

const Code: React.FC<{ children: React.ReactNode }> = (props) => {
  return <code className='italic pr-5 '>{props.children}</code>
}

const Pre: React.FC<{ children: React.ReactNode }> = (props) => {
  const ref = useRef<HTMLPreElement>(null)
  return (
    <div className='w-full border relative overflow-x-auto rounded-md p-4'>
      <pre ref={ref} className='w-full'>
        {props.children}
      </pre>
    </div>
  )
}

const Headline1: React.FC<{ children: React.ReactNode }> = (props) => {
  return <h1 className='text-3xl font-bold'>{props.children}</h1>
}

const Headline2: React.FC<{ children: React.ReactNode }> = (props) => {
  return <h1 className='text-2xl font-bold'>{props.children}</h1>
}

const Headline3: React.FC<{ children: React.ReactNode }> = (props) => {
  return <h1 className='text-xl font-bold'>{props.children}</h1>
}

export default Markdown
