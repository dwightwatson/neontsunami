import React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Post from "../components/post"

const Tags = (props) => {
  const { pageContext, data } = props
  const { tag } = pageContext
  const siteTitle = props.data.site.siteMetadata.title
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"}`

  return (
    <Layout location={props.location} title={siteTitle}>
      <Seo title={tag} description={`Posts related to ${tagHeader}`} />

      <div className="mb-4">
        <h1 className="text-2xl">#{tag}</h1>
        <small>{tagHeader}</small>
      </div>

      <ul>
        {edges.map(({ node }) => (
          <Post key={node.id} node={node} />
        ))}
      </ul>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            path
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
