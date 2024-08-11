import React from 'react'
import Arena from '../Arena/Arena'
import CodeEditor from './CodeEditor'
import { ChakraProvider } from "@chakra-ui/react";


const Playground = () => {
  return (
    <ChakraProvider>
        <CodeEditor/>
    </ChakraProvider>
  )
}

export default Playground
