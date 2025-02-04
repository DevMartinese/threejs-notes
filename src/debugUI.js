import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'

// Debug UI
const gui = new GUI()

// Sizes
const sizes = {
  width: window.innerWidth,
  heigth: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update Sizes
  sizes.width = window.innerWidth
  sizes.heigth = window.innerHeight

  // Update Camera
  camera.aspect = sizes.width / sizes.heigth
  camera.updateProjectionMatrix()

  // Update Renderer
  renderer.setSize(sizes.width, sizes.heigth)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    }
    else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  }
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

gui
  .add(mesh.position, 'y')
  .min('-3')
  .max('3')
  .step('0.01')
  .name('elevation')

gui
  .add(mesh, 'visible')

gui
  .add(material, 'wireframe')

gui
  .addColor(material, 'color')

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth, 0.1, 100)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.heigth)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {

  //mesh.rotation.y = elapsedTime
  //const elapsedTime = clock.getElapsedTime()

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()