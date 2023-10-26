import {
  Avatar,
  Box,
  Center,
  DarkMode,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Icon,
  Input,
  Button,
  Link,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
// import * as React from "react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { Logo } from "../../components/Logo";
import { Step } from "../../components/Step";
import { useStep } from "../../components/useStep";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "lib/firebase/client";
import { Confirm } from "./04-confirm";
import { PetBasics } from "./02-pet-basics";
import { PetDetails } from "./03-pet-details";
import { HumanProfile } from "./01-human-profile";

type User = {
  // eslint-disable-next-line
  customClaims: any;
  disabled: boolean;
  displayName: string;
  emailVerified: boolean;
  // eslint-disable-next-line
  metadata: any;
  phoneNumber: string;
  // eslint-disable-next-line
  providerData: any;
  uid: string;
};

const SignUp = () => {
  const [location, setLocation] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // const [locationChecked, setLocationChecked] = useState(false);
  const router = useRouter();
  const [existingUser, setExistingUser] = useState({} as User);
  const [loading, setLoading] = useState(false);

  const [user] = useAuthState(auth);

  const numberOfSteps = 3;
  const [currentStep, { setStep }] = useStep({
    maxStep: numberOfSteps,
    initialStep: 0,
  });

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  useEffect(() => {
    setModalOpen(isMobile);
  }, []);

  return (
    <Flex
      bgGradient={useBreakpointValue({
        md: mode(
          "linear(to-r, brand.600 50%, white 50%)",
          "linear(to-r, brand.600 50%, gray.900 50%)"
        ),
      })}
      h="100%"
    >
      <NextSeo title="Get Started" />

      <Flex maxW="8xl" mx="auto" width="full">
        <Box flex="1" display={{ base: "none", md: "flex" }}>
          <DarkMode>
            <Flex
              direction="column"
              px={{ base: "4", md: "8" }}
              height="full"
              color="on-accent"
            >
              <Flex align="center" h="24">
                <Logo />
              </Flex>

              <Flex
                align="center"
                h="full"
                px={useBreakpointValue({ base: "0", xl: "16" })}
              >
                <Stack spacing="0" justify="space-evenly" flex="1">
                  {[...Array(numberOfSteps)].map((_, id) => (
                    <Step
                      // eslint-disable-next-line
                      key={id}
                      cursor="pointer"
                      isActive={currentStep === id}
                      isCompleted={currentStep > id}
                      isLastStep={numberOfSteps === id + 1}
                    />
                  ))}
                </Stack>
              </Flex>

              <Flex align="center" h="24">
                <Text color="on-accent-subtle" fontSize="sm">
                  © 2022 Doghouse Kenya. All rights reserved.
                </Text>
              </Flex>
            </Flex>
          </DarkMode>
        </Box>

        <Flex
          flex="1"
          w="full"
          h="full"
          align="center"
          justify="center"
          direction="column"
        >
          {isMobile && (
            <HStack spacing="0" justify="space-evenly" flex="1">
              {[...Array(numberOfSteps)].map((_, id) => (
                <Step
                  // eslint-disable-next-line
                  key={id}
                  cursor="pointer"
                  isActive={currentStep === id}
                  isCompleted={currentStep > id}
                  isLastStep={numberOfSteps === id + 1}
                />
              ))}
            </HStack>
          )}

          {currentStep === 0 && (
            <HumanProfile currentStep={currentStep} setStep={setStep} />
          )}

          {currentStep === 1 && (
            <PetBasics currentStep={currentStep} setStep={setStep} />
          )}
          {currentStep === 2 && (
            <PetDetails currentStep={currentStep} setStep={setStep} />
          )}
          {currentStep === 3 && (
            <Confirm currentStep={currentStep} setStep={setStep} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
