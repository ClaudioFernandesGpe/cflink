import { type ReactNode } from "react"

interface SocialProps {
    url: string;
    children: ReactNode;
}

export function Social({url, children}: SocialProps) {
  return (
    <div>
        <a href={url} rel="noopner noreferrer" target="_blank">
            {children}
        </a>
    </div>
  )
}
 