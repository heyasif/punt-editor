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
  useToast,
} from "@chakra-ui/react";
import fontData from "./punt-frontend-assignment.json";

interface FontVariants {
  [weight: string]: string;
}

interface FontDetails {
  [fontName: string]: FontVariants;
}

interface FontVariant {
  weight: number;
  italic: boolean;
}

const findClosestVariant = (
  desiredWeight: number,
  desiredItalic: boolean,
  availableVariants: FontVariant[]
): FontVariant => {
  const italicVariants = availableVariants.filter((variant) => variant.italic);
  const nonItalicVariants = availableVariants.filter(
    (variant) => !variant.italic
  );

  const getClosestWeight = (
    weight: number,
    variants: FontVariant[]
  ): FontVariant => {
    return variants.reduce((prev, curr) =>
      Math.abs(curr.weight - weight) < Math.abs(prev.weight - weight)
        ? curr
        : prev
    );
  };

  if (desiredItalic) {
    if (italicVariants.length > 0) {
      return getClosestWeight(desiredWeight, italicVariants);
    }
    return getClosestWeight(desiredWeight, nonItalicVariants);
  } else {
    if (nonItalicVariants.length > 0) {
      return getClosestWeight(desiredWeight, nonItalicVariants);
    }
    return getClosestWeight(desiredWeight, italicVariants);
  }
};

const TextEditor: React.FC = () => {
  const fontDetails: FontDetails = fontData;
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(false);
  const [font, setFont] = useState<string>("");
  const [weidth, setWeidth] = useState<string>("");
  const [fontWeights, setFontWeights] = useState<FontVariants>({});
  const toast = useToast();

  useEffect(() => {
    const head = document.head;
    if (weidth && font) {
      let url = fontDetails[font][weidth];
      if (!url) {
        const availableVariants = Object.entries(fontDetails[font]).map(
          ([variant]) => {
            const weight = parseInt(variant, 10);
            const italic = variant.includes("italic");
            return { weight, italic };
          }
        );

        const closestVariant = findClosestVariant(
          parseInt(weidth),
          toggle,
          availableVariants
        );
        setWeidth(closestVariant.weight.toString());
        setToggle(closestVariant.italic);
        url =
          fontDetails[font][
            closestVariant.weight + (closestVariant.italic ? "italic" : "")
          ];
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.setAttribute("data-font", font);
      head.appendChild(link);

      const style = document.createElement("style");
      style.textContent = `
        @font-face {
          font-family: '${font}';
          font-weight: ${weidth};
          src: url(${url}) format('woff2');
        }
      `;
      head.appendChild(style);
    }
  }, [font, weidth, toggle]);

  useEffect(() => {
    if (font) {
      const newFontWeights: FontVariants = {};
      Object.entries(fontDetails[font]).forEach(([weight, url]) => {
        if (weight.length === 3) {
          newFontWeights[weight] = url;
        }
      });
      setFontWeights(newFontWeights);
    } else {
      setFontWeights({});
    }
  }, [font]);

  useEffect(() => {}, [text]);

  useEffect(() => {
    const savedText = localStorage.getItem("text");
    const savedFont = localStorage.getItem("font");
    const savedWeight = localStorage.getItem("weight");
    const savedItalic = localStorage.getItem("toggle");
    if (savedText) setText(savedText);
    if (savedFont) setFont(savedFont);
    if (savedWeight) setWeidth(savedWeight);
    if (savedItalic) setToggle(JSON.parse(savedItalic));
  }, []);

  const handlesave = () => {
    localStorage.setItem("text", text);
    localStorage.setItem("font", font);
    localStorage.setItem("weight", weidth);
    localStorage.setItem("toggle", JSON.stringify(toggle));
    toast({
      title: "Data saved!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handlereset = () => {
    setText("");
    setFont("");
    setWeidth("");
    setToggle(false);
    localStorage.removeItem("text");
    localStorage.removeItem("font");
    localStorage.removeItem("weight");
    localStorage.removeItem("toggle");
    toast({
      title: "Data reset!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    setFont(selectedFont);

    const availableVariants = Object.entries(fontDetails[selectedFont]).map(
      ([variant]) => {
        const weight = parseInt(variant, 10);
        const italic = variant.includes("italic");
        return { weight, italic };
      }
    );

    const closestVariant = findClosestVariant(
      parseInt(weidth) || 400,
      toggle,
      availableVariants
    );
    setWeidth(closestVariant.weight.toString());
    setToggle(closestVariant.italic);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeight = e.target.value;
    setWeidth(selectedWeight);
  };

  return (
    <VStack spacing={8} p={8} align="stretch" minH="100vh" bg="gray.100">
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
        bg="white"
      >
        <HStack spacing={8} mb={8}>
          <FormControl id="font-family">
            <FormLabel>Font Family</FormLabel>
            <Select value={font} onChange={handleFontChange}>
              <option value="">Select Font</option>
              {Object.keys(fontDetails).map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="font-weight">
            <FormLabel>Variant</FormLabel>
            <Select value={weidth} onChange={handleWeightChange}>
              <option value="">Select Weight</option>
              {Object.keys(fontWeights).map((weidth) => (
                <option key={weidth} value={weidth}>
                  {weidth}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="italic">
            <FormLabel>Italic</FormLabel>
            <Switch
              isChecked={toggle}
              onChange={() => setToggle(!toggle)}
              isDisabled={
                fontDetails[font] === undefined ||
                fontDetails[font][weidth + "italic"] === undefined
              }
            />
          </FormControl>
        </HStack>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            fontFamily: font,
            fontWeight: weidth,
            fontStyle: toggle ? "italic" : "normal",
          }}
          placeholder="Start typing..."
          height="400px"
          mb={4}
          bg="gray.50"
        />

        <HStack spacing={4} justifyContent="center">
          <Button onClick={handlereset}>Reset</Button>
          <Button onClick={handlesave}>Save</Button>
        </HStack>
      </Box>
      <Spacer />
      <Box as="footer" py={4} textAlign="center" borderTop="1px" mt={8}>
        <Text>
          &copy; {new Date().getFullYear()} Punt Partners. All rights reserved.
        </Text>
      </Box>
    </VStack>
  );
};

export default TextEditor;
