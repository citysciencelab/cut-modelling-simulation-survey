/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from 'react'
import { useGLTF, Bounds, useBounds } from '@react-three/drei'
import * as THREE from "three"
import { BoxGeometry } from 'three';
import { RoundedBox } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import PocketBase from 'pocketbase';
import 'cross-fetch/dist/node-polyfill.js'


const client = new PocketBase('https://pocketbase.cut.hcu-hamburg.de');
const records  = await client.collection('cut_tools').getFullList({sort: '-created',})
export { records }
console.log(records )

// define new colors and add them to colors json so they appear in legend as well
const web_color = '#c2653a'
const web_color_hov = '#FF8953'
const data_color = '#3aa1c2'
const data_color_hov = '#4EC7EE'
const colors = [{
  colorcode: web_color,
  class: "Web Tool"
},
{
  colorcode: data_color,
  class: "Data"
}]; //
export { colors }
export default function LegoModel({ ...props }) {
  

  function getColor(aqi, hover ) {
    let color = ''
  
  if (aqi == 150) {
    color =  '#bbbbbb'
  }
  else if (aqi === undefined) {

  }
  else {
    if (aqi['tool_category'] == 'Web Tool') {
      if (hover == true) {
        color = web_color_hov
      }
      else if (hover == false) {
        color = web_color
      }
      
    }
    else if (aqi['tool_category'] == 'Data') {
      if (hover == true) {
        color = data_color_hov
      }
      else if (hover == false) {
        color = data_color
      }
    }    
  }
  
  return color;
}

  const tools = records

  function add_cube_to_capacity(level_capacity, row_capacity, level, row, sidelength) {
    level_capacity = level_capacity + 1;
    row_capacity = row_capacity + 1;
      if (level_capacity > (sidelength ** 2)-1) {
        // Increase the level when capacity exceeds sidelength
        level_capacity = 0;
        level = level + 1;
        row_capacity = 0
        row = 0
      }
      if (row_capacity > sidelength-1) {
        // Increase the row when capacity exceeds sidelength
        row_capacity = 0;
        row = row + 1;
      }
      return [level_capacity, row_capacity, level, row];
  }

  // IMPORTANT following function is just capable for up to 52 json entries
  function generate_matrix( block_json) {
    const length = block_json.length;
    let sidelength = 0
    if (length == 1) {
      sidelength = 1
    }
    else if (1 < length && length < 9) {
      sidelength = 2
    }
    else if (8 < length && length < 26) {
      sidelength = 3
    }
    else if (25 < length && length < 53) {
      sidelength = 4
    }
    const build_matrix = []
    let blacklist = []
    if (13 < length && length < 22) {
      blacklist = [4]
    }
    else if (21 < length && length < 26) {
      blacklist = [4, 13]
    }
    else if (25 < length && length < 34) {
      blacklist = [5,6, 9, 10]
    }
    else if (33 < length && length < 36) {
      blacklist = [5,6, 9, 10, 21, 22]
    }
    else if (35 < length && length < 46) {
      blacklist = [5,6, 9, 10, 21, 22, 25, 26]
    }
    else if (45 < length && length < 48) {
      blacklist = [5,6, 9, 10, 21, 22, 25, 26, 37, 38]
    }
    else if (47 < length && length < 53) {
      blacklist = [5,6, 9, 10, 21, 22, 25, 26, 37, 38, 41, 42]
    }
    //else if (22 < length < 27) {
    //  blacklist = [4, 13]
    //}

    let level_capacity = 0;
    let row_capacity = 0;
    let level = 0;
    let row = 0;
    const run_length = length + blacklist.length
    let json_item = 0
    for (let i = 0; i < run_length; i++) {
      if (!build_matrix[level]) {
        // Create a new sub-array for the current level if it doesn't exist
        build_matrix[level] = [];
      }
  
      if (!build_matrix[level][row]) {
        // Create a new sub-array for the current row if it doesn't exist
        build_matrix[level][row] = [];
      }
      if (blacklist.includes(i) == true) {
        build_matrix[level][row].push(150);
        [level_capacity, row_capacity, level, row] = add_cube_to_capacity(level_capacity, row_capacity, level, row, sidelength)
        if (!build_matrix[level]) {
          // Create a new sub-array for the current level if it doesn't exist
          build_matrix[level] = [];
        }
        if (!build_matrix[level][row]) {
          // Create a new sub-array for the current row if it doesn't exist
          build_matrix[level][row] = [];
        }
      }
      else {
        
        build_matrix[level][row].push(block_json[json_item]);
        json_item = json_item+1;
      [level_capacity, row_capacity, level, row] = add_cube_to_capacity(level_capacity, row_capacity, level, row, sidelength)
      }
      
      
      
      // Push the value into the current level and row of the build_matrix
      
    }
  
    return [build_matrix, sidelength];
  }
  const data = generate_matrix(tools)
  const matrix = data[0]
  const sidelength = data[1]


  function get_position(j,i,k, sidelength, z, clicked, obj_no) {
    const shift = 24  
    let position = []
    
      if (k==sidelength-1) {
        if (j==0) {
          position = [-65 - shift + 25.5 * j, -5 + 25.5 * i, 0 + shift + 25.5 * k]}
        else if (j==sidelength-1) {
          position = [-65 + shift + 25.5 * j, -5  + 25.5 * i, 0 + shift + 25.5 * k]}
        else {
        position = [-65 + 25.5 * j, -5 + 25.5 * i, 0 + shift + 25.5 * k]}
      }
      else if (k == 0) {
        if (j==0) {
          position = [-65 - shift + 25.5 * j, -5 + 25.5 * i, 0 +-shift + 25.5 * k]}
        else if (j==sidelength-1) {
          position = [-65 + shift + 25.5 * j, -5  + 25.5 * i, 0 - shift + 25.5 * k]}
        else {
        position = [-65 + 25.5 * j, -5 + 25.5 * i, 0 - shift + 25.5 * k]}
      }
      else if (k !== 0 && k !== sidelength-1) {
        if (j==0) {
          position = [-65 - shift + 25.5 * j, -5  + 25.5 * i, 0 + 25.5 * k]}
  
        else if (j == sidelength-1) {
          position = [-65 + shift + 25.5 * j, -5  + 25.5 * i, 0 + 25.5 * k]}
        else if (j !== 0) {
        position = [-65 + 25.5 * j, -5 + shift + 25.5 * i, 0 + 25.5 * k]}
        }
      else {
        position = [-65 + 25.5 * j, -5 + 25.5 * i, 0 + 25.5 * k]
      }
    
    setupBoxes[obj_no] = true
    setTargetPosition(obj_no, position);
    return position
  }
  function setTargetPosition(index, targetPosition) {
    const newTargetPositions = [...targetPositions];
    newTargetPositions[index] = targetPosition;
    setTargetPositions(newTargetPositions);
  }
  function ResetTargetPosition() {
    const newTargetPositions = start_positions;
    setTargetPositions(newTargetPositions);
  }

  //Dialogue management
  function handleClickOpen(data, event, j,i,k,sidelength,z, obj_no) {
    //ResetTargetPosition()
    setCurrentPositions(start_positions)
    get_position(j,i,k,sidelength,z,  clickedBoxes[obj_no] ? true : false, obj_no)
    event.stopPropagation()
    props.onHandleDialog(true, data);
    

  };

  const start_positions = [
    [-65, 0, 0],
    [-65, 0, 25],
    [-65, 0, 51],
    [-40, 0, 0],
    [-40, 0, 25],
    [-40, 0, 51],
    [-14, 0, 0],
    [-14, 0, 25],
    [-14, 0, 51],
    [-65, 25, 0],
    [-65, 25, 25],
    [-65, 25, 51],
    [-40, 25, 0],
    [-40, 25, 25],
    [-40, 25, 51],
    [-14, 25, 0],
    [-14, 25, 25]
  ];
  const [hoveredBoxes, setHoveredBoxes] = useState(Array(64).fill(false));
  const [clickedBoxes, setClickedBoxes] = useState(Array(64).fill(false));
  const setupBoxes = Array(64).fill(false)
  const [currentPositions, setCurrentPositions] = useState(Array(64).fill([0,0,0])); // Initialize with an empty array
  const [targetPositions, setTargetPositions] = useState(start_positions);
  
  function calculateDistance(point1, point2) {
    const [x1, y1, z1] = point1;
    const [x2, y2, z2] = point2;
  
    return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2 + (z2 - z1)**2);
  }
  useFrame((state, delta) => {
    const newCurrentPositions = [...currentPositions];
  
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        for (let k = 0; k < matrix[i][j].length; k++) {
          const boxIndex = k + j * sidelength + i * sidelength * sidelength;
          const currentPosition = newCurrentPositions[boxIndex];
          const targetPosition = targetPositions[boxIndex];
          if (targetPosition) {
            const distance = calculateDistance(currentPosition, targetPosition);
            const speed = 0.1;
  
            if (distance > 50) {
              const newPosition = [];
              for (let l = 0; l < 3; l++) {
                newPosition[l] = currentPosition[l] + (targetPosition[l] - currentPosition[l]) * speed;
              }
            
              newCurrentPositions[boxIndex] = newPosition;
            } 
            else if (distance > 1) {
              const newPosition = [];
              for (let l = 0; l < 3; l++) {
                newPosition[l] = currentPosition[l] + (targetPosition[l] - currentPosition[l]) * speed;
              }
            
              newCurrentPositions[boxIndex] = newPosition;
            } 
            else {
              setCurrentPositions(boxIndex, targetPosition);
              setTargetPosition(boxIndex, null);
            }
          }
        }
      }
    }
  
    setCurrentPositions(newCurrentPositions);
  });
  
  return (
    matrix.map((x, i) => {
      return (
          x.map((y, j) => {
              return (
                  y.map((z, k) => {
                      const obj_no = k+j*sidelength+i*sidelength*sidelength
                      //if (setupBoxes[0] == false) {get_position(j,i,k,sidelength,z,  clickedBoxes[obj_no] ? true : false, obj_no)}
                      //newCurrentPositions[obj_no] = position;
                      //setCurrentPosition(obj_no, position)
                      return (
                          <mesh 
                          onPointerOver={(event) => {
                            event.stopPropagation()
                            const newHoveredBoxes = [];
                            newHoveredBoxes[obj_no] = true;
                            setHoveredBoxes(newHoveredBoxes);
                          }}
                          onPointerOut={(event) => {
                            const newHoveredBoxes = [...hoveredBoxes];
                            newHoveredBoxes[obj_no] = false;
                            setHoveredBoxes(newHoveredBoxes);
                            //event.stopPropagation()
                          }}  
                          onClick={(event) => {
                            const newClickedBoxes = [];
                            newClickedBoxes[obj_no] = true;
                            setClickedBoxes(newClickedBoxes);
                            handleClickOpen(z, event, j,i,k,sidelength,z, obj_no)
                          }}
                          >
                          
                            <RoundedBox 
                            key={i + "," + j + "," + k} 
                            radius={0.05} 
                            smoothness={4} 
                            scale={25} 
                            position={currentPositions[obj_no]}>
                                <meshPhongMaterial color={getColor(z, hoveredBoxes[obj_no] ? true : false)} transparent opacity={100}  />
                            </RoundedBox>
                          </mesh>
                      )
                  }))
          }))
// TODO Farben anpassen, Legende
  })
  )
}


