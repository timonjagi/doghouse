import {
  Stack,
  Heading,
  useBreakpointValue,
  Alert,
  Text,
  AlertIcon,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  Center,
} from "@chakra-ui/react";

export const VerifyOTPModal = (props) => {
  const {
    loading,
    existingUser,
    phoneNumber,
    onSubmit,
    setCode,
    codeSent,
    sendVerificationCode,
  } = props;

  return (
    <Modal
      isOpen={codeSent}
      onClose={() => {}}
      size={useBreakpointValue({ base: "sm", sm: "md" })}
      isCentered
    >
      <ModalOverlay></ModalOverlay>

      <ModalContent p="8">
        <ModalBody>
          <Stack spacing="9" as="form" onSubmit={onSubmit}>
            {existingUser && existingUser.displayName && (
              <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
                Hey {existingUser.displayName}! Welcome back!
              </Heading>
            )}

            <Alert status="success">
              <AlertIcon />
              <Text fontSize="sm">
                Please enter the OTP code sent to {phoneNumber} to continue
              </Text>
            </Alert>

            <FormControl>
              {/* <FormLabel htmlFor="code">Enter OTP Code</FormLabel> */}
              <HStack justify="space-between">
                <PinInput otp onChange={(value) => setCode(value)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </FormControl>

            <Button
              w="full"
              variant="primary"
              type="submit"
              isLoading={loading}
              loadingText="Verifying code..."
              spinnerPlacement="end"
            >
              Continue
            </Button>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Center w="full">
            <HStack spacing="1" justify="center">
              <Text fontSize="sm" color="muted">
                Did&apos;t get a code?
              </Text>
              <Button
                size="sm"
                variant="link"
                colorScheme="brand"
                onClick={sendVerificationCode}
              >
                Resend
              </Button>
            </HStack>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
