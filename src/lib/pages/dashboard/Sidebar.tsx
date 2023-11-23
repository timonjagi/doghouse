import { Flex, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import {
  FiBarChart2,
  FiCamera,
  FiFilm,
  FiHome,
  FiInstagram,
  FiLinkedin,
  FiMic,
  FiMusic,
  FiTwitter,
} from "react-icons/fi";
import { Logo } from "../../components/nav/Logo";
import { NavButton } from "./NavButton";

export const Sidebar = () => (
  <Flex
    flex="1"
    bg="bg-accent"
    color="on-accent"
    overflowY="auto"
    maxW={{ base: "full", sm: "xs" }}
    py={{ base: "6", sm: "8" }}
    px={{ base: "4", sm: "6" }}
  >
    <Stack justify="space-between" spacing="1" width="full">
      <Stack spacing="8" shouldWrapChildren>
        <Logo />
        <Stack spacing="1">
          <NavButton label="Home" icon={FiHome} />
          <NavButton label="Writing" icon={FiBarChart2} aria-current="page" />
        </Stack>
        <Stack>
          <Text fontSize="sm" color="on-accent-muted" fontWeight="medium">
            Media
          </Text>
          <Stack spacing="1">
            <NavButton label="Movies" icon={FiFilm} />
            <NavButton label="Pictures" icon={FiCamera} />
            <NavButton label="Music" icon={FiMusic} />
            <NavButton label="Podcasts" icon={FiMic} />
          </Stack>
        </Stack>
        <Stack>
          <Text fontSize="sm" color="on-accent-muted" fontWeight="medium">
            Social
          </Text>
          <Stack spacing="1">
            <NavButton label="Twitter" icon={FiTwitter} />
            <NavButton label="Instagram" icon={FiInstagram} />
            <NavButton label="Linkedin" icon={FiLinkedin} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  </Flex>
);
