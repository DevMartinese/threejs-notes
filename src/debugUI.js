import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'

// Debug UI
const gui = new GUI({
  width: 300,
  title: 'Nice Debug UI',
  closeFolders: false
})
//gui.close()
//gui.hide()

window.addEventListener('keydown', (event) => {
  if(event.key == 'h')
    gui.show(gui._hidden)
})

const debugObject = {}

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
debugObject.color = '#3a6ea6'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: false })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('Awesome Cube!')
//cubeTweaks.close()

cubeTweaks
  .add(mesh.position, 'y')
  .min('-3')
  .max('3')
  .step('0.01')
  .name('elevation')

cubeTweaks
  .add(mesh, 'visible')

cubeTweaks
  .add(material, 'wireframe')

cubeTweaks
  .addColor(debugObject, 'color')
  .onChange(() => {
    material.color.set(debugObject.color)
  })

debugObject.spin = () => {
  gsap
    .to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 })
}
cubeTweaks
  .add(debugObject, 'spin')

debugObject.subdivision = 2
cubeTweaks
  .add(debugObject, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(
      1, 1, 1,
      debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
    )
  })

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
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