import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Switch,
  Button,
  HStack,
  VStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import fontData from "./punt-frontend-assignment.json"; // Assuming the JSON data is saved here

type FontData = {
  [fontFamily: string]: {
    [weight: string]: string;
  };
};

const TextEditor: React.FC = () => {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState<string>("ABeeZee");
  const [fontWeight, setFontWeight] = useState<string>("400");
  const [italic, setItalic] = useState<boolean>(false);

  useEffect(() => {
    const savedText = localStorage.getItem("text");
    const savedFontFamily = localStorage.getItem("fontFamily");
    const savedFontWeight = localStorage.getItem("fontWeight");
    const savedItalic = localStorage.getItem("italic");

    if (savedText) setText(savedText);
    if (savedFontFamily) setFontFamily(savedFontFamily);
    if (savedFontWeight) setFontWeight(savedFontWeight);
    if (savedItalic) setItalic(savedItalic === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("text", text);
    localStorage.setItem("fontFamily", fontFamily);
    localStorage.setItem("fontWeight", fontWeight);
    localStorage.setItem("italic", italic.toString());
  }, [text, fontFamily, fontWeight, italic]);

  const handleFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newFontFamily = event.target.value;
    setFontFamily(newFontFamily);
    setFontWeight(Object.keys((fontData as FontData)[newFontFamily])[0]);
    setItalic(false);
  };

  const handleFontWeightChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontWeight(event.target.value);
    setItalic(false);
  };

  const handleItalicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItalic(event.target.checked);
  };

  const handleReset = () => {
    setText("");
    setFontFamily("ABeeZee");
    setFontWeight("400");
    setItalic(false);
    localStorage.clear();
  };

  return (
    <VStack spacing={8} p={8} align="stretch" minH="100vh">
      <Heading as="h1" mb={4} textAlign="center">
        Punt Partners Assignment
      </Heading>
      <Box
        border="1px"
        borderRadius="md"
        p={8}
        boxShadow="md"
        w="80%"
        mx="auto"
      >
        <HStack spacing={8} mb={8}>
          <FormControl id="font-family">
            <FormLabel>Font Family</FormLabel>
            <Select value={fontFamily} onChange={handleFontFamilyChange}>
              {Object.keys(fontData as FontData).map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="font-weight">
            <FormLabel>Variant</FormLabel>
            <Select value={fontWeight} onChange={handleFontWeightChange}>
              {Object.keys((fontData as FontData)[fontFamily]).map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="italic">
            <FormLabel>Italic</FormLabel>
            <Switch
              isChecked={italic}
              onChange={handleItalicChange}
              isDisabled={
                !(fontData as FontData)[fontFamily][`${fontWeight}italic`]
              }
            />
          </FormControl>
        </HStack>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            fontFamily,
            fontWeight,
            fontStyle: italic ? "italic" : "normal",
          }}
          placeholder="Start typing..."
          height="400px"
          mb={4}
        />

        <HStack spacing={4} justifyContent="center">
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={() => localStorage.setItem("text", text)}>
            Save
          </Button>
        </HStack>
      </Box>
      <Spacer />
      <Box as="footer" py={4} textAlign="center" borderTop="1px" mt={8}>
        <Text>
          &copy; {new Date().getFullYear()} Mohd Asif. All rights reserved.
        </Text>
      </Box>
    </VStack>
  );
};

export default TextEditor;
