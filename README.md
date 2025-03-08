# r3f-playground
Vite + React and React Three Fiber (R3F) experimental website

Playing around and making splash pages for my personal websites, such as [daigofujiwara.com](https://daigofujiwara.com) and [fujiwaras.com](https://fujiwaras.com)

- [R3F Docs](https://r3f.docs.pmnd.rs/getting-started/introduction)

- [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

- [Drei](https://drei.docs.pmnd.rs/getting-started/introduction) [github](https://github.com/pmndrs/drei)

Reference [Tutorial](https://github.com/sixfwa/threejs-basics) that I used.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

uses node v18.20.4. Run `nvm use` to switch to the correct version.

## Getting Started

```bash
npm install
npm start
```



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Note

I made sagarifuji.glb from svg.
- Import SVG shape in [blender app](https://www.blender.org/)
- hit S to scale it larger
- Coltrol J to join the shapes
- Pressing tab will enter the "edit mode"
- A to select all
- E to extrude
- rotating x axis to 90 degree 
- remove material 
- export as glb
- drop the file in public folder


### To import glb file in threejs

I used [gltf.pmnd.rs](https://gltf.pmnd.rs/) to convert glb to react component that can be used by R3F. 

### Using font

I used Russo One font from google font. Download ttf file and use converter such as [facetype.js](https://gero3.github.io/facetype.js/) to convert to json.

### Other notes

- useFrame in R3F is a hook that runs every frame rendered, similar to a render loop.
- You receive the state (useThree) and a clock delta https://r3f.docs.pmnd.rs/api/hooks#useframe
