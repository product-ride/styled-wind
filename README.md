![Styled-wind](./images/logo.svg)

> A magical implementation of tailwind-like classnames into styled-components.

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/product-ride/styled-wind/styled-wind-ci?style=flat-square)
![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)
![Jest](https://img.shields.io/badge/tested%20with-jest-blue?style=flat-square)

## What is styled wind?

Styled-wind is a CSS-in-JS library, written on top of styled-components. It inherits everything from styled-components and also gives you the flexibility to use tailwind classnames along with styled-components.
[Read the docs](https://styled-wind.netlify.app/) to know more.

## Motivation

Styled-components is one of the most famous CSS-in-JS library and has been favorite styling tool in the React ecosystem. On the other hand, tailwind css has gained a lot of momentum recently because of the ease of use and quick development of responsive web apps. However, there are few practical issues in using tailwind css. This library is an attempt to get the best of both worlds.

See the [Quick start](https://styled-wind.netlify.app/#/quickstart) guide for more details.

## Why styled-wind?

- Building Responsive sites becomes a lot easier
- Very small bundle size to use in existing projects
- 2 minutes migration to use tailwind in a styled-component project
- Solving the readability issues of tailwind
- Build reusable components / UI libraries
- Dynamic styling using props
- Benefits of tailwind in Component world of React & Styled-components
- Remembering or writing CSS is not required
- Tailwind like development for React Native

## Prerequisite

Basic knowledge of [styled-components](https://styled-components.com/) and [tailwindcss](https://tailwindcss.com/). The list of tailwind class names can be found [here](https://nerdcave.com/tailwind-cheat-sheet)

## Features

- Zero-CSS
- Responsive
- Custom Styling/Theme
- No class name bugs
- Development speed
- Automatic critical CSS
- Easier maintenance of CSS
- Automatic vendor prefixing
- Simple dynamic styling
- Tailwind is not required

## Roadmap/TODO:

> Contributions & Suggestions welcome

- Auto intellisense, syntax highlighting and linting
- Support for React Native
- Allowing tailwind classes inside prop's conditions
- CLI/Context for consuming custom styling
- Add support for animation classes
- Optimize the library

## Caveats

- React Native support is not added yet
- Tailwind classnames aren't supported yet inside keyframes and expressions. However you may still use regular CSS for expressions & keyframes

  ```tsx
  // Not allowed. Will be implemented in future
  const StyledComponent = styled.div`
          @keyframes mymove{
              from { .top-10 }
              to { .top-16 }
          }
      `;

  // Allowed
  const StyledComponent = styled.div`
    @keyframes mymove {
      from {
        top: 0px;
      }
      to {
        top: 200px;
      }
    }
  `;
  ```

- Animation classes aren't supported yet.
- Custom theme can currently be configured only inside `index.html` file
- No support for variants as we find no dominant use case in component world
- Please report if you happen to find any issues.

## Examples

Check out the [CodeSandBox](https://codesandbox.io/s/styled-wind-demo-hxmsi?file=/src/App.js) to see styled-wind in use.

## Community

The creators of the library are always open to discussions/suggestions. Their twitter accounts:

- Ameer Jhan [Twitter](https://twitter.com/ameerthehacker)
- Vilva Athiban [Twitter](https://twitter.com/vilvaathibanpb)

## Contributors

Thanks goes to these awesome people for their wonderful contributions!

<table>
  <tr>
    <td align="center"><a href="https://github.com/ameerthehacker"><img src="https://avatars1.githubusercontent.com/u/15448192?s=460&u=184f1afd99fb523c44f00d493cb7384f2e786491&v=4" width="100px;" /><br /><sub><b>Ameer Jhan
</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/vilvaathibanpb"><img src="https://avatars2.githubusercontent.com/u/11838711?s=460&u=d44954ce7d5f06fb086adaa081852bd02dd4e456&v=4" width="100px;" /><br /><sub><b>Vilva Athiban P B
</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/sudharsangs"><img src="https://avatars3.githubusercontent.com/u/30121484?s=460&u=d42af96f15bb7984e722df836c610034000a786a&v=4" width="100px;" /><br /><sub><b>Sudharsan
</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/BA1RY"><img src="https://avatars2.githubusercontent.com/u/10570968?s=460&u=a50fb41319b09eea1581343df6b1a65c6e3d00d3&v=4" width="100px;" /><br /><sub><b>Shashank Bairy R
</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/jyash97"><img src="https://avatars2.githubusercontent.com/u/22376783?s=460&v=4" width="100px;" /><br /><sub><b>Yash Joshi</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/devevignesh"><img src="https://avatars0.githubusercontent.com/u/31436276?s=460&u=63c9764cbc4789b38cc324f266ec4fe7dbbdf387&v=4" width="100px;" /><br /><sub><b>Vignesh Elangovan
</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/nithish1245"><img src="https://avatars1.githubusercontent.com/u/48820593?s=460&u=5b7c8351d549148c3280d90c901660caea70d79d&v=4" width="100px;" /><br /><sub><b>Nithish D
</b></sub></a><br /></td>
  </tr>
</table>

## License

MIT © [Product Ride](http://productride.com/)
