import {
  Stack,
  Heading,
  Box,
  BoxProps,
  Circle,
  createIcon,
  Icon,
  StackProps,
  useId,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  useStyleConfig,
  Text,
  Button,
  ButtonGroup,
  Spacer,
} from "@chakra-ui/react";
import { auth } from "lib/firebase/client";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface RadioCardGroupProps<T> extends Omit<StackProps, "onChange"> {
  name?: string;
  value?: T;
  defaultValue?: string;
  onChange?: (value: T) => void;
}

const RadioCardGroup = <T extends string>(props: RadioCardGroupProps<T>) => {
  const { children, name, defaultValue, value, onChange, ...rest } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange,
  });

  const cards = React.useMemo(
    () =>
      React.Children.toArray(children)
        .filter<React.ReactElement<RadioCardProps>>(React.isValidElement)
        .map((card) => {
          return React.cloneElement(card, {
            radioProps: getRadioProps({
              value: card.props.value,
            }),
          });
        }),
    [children, getRadioProps]
  );

  return <Stack {...getRootProps(rest)}>{cards}</Stack>;
};

interface RadioCardProps extends BoxProps {
  value: string;
  radioProps?: UseRadioProps;
}

const RadioCard = (props: RadioCardProps) => {
  const { radioProps, children, ...rest } = props;
  const { getInputProps, getCheckboxProps, getLabelProps, state } =
    useRadio(radioProps);
  const id = useId(undefined, "radio-button");

  const styles = useStyleConfig("RadioCard", props);
  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();
  const labelProps = getLabelProps();
  return (
    <Box
      as="label"
      cursor="pointer"
      {...labelProps}
      sx={{
        ".focus-visible + [data-focus]": {
          boxShadow: "outline",
          zIndex: 1,
        },
      }}
    >
      <input {...inputProps} aria-labelledby={id} />
      <Box sx={styles} {...checkboxProps} {...rest}>
        <Stack direction="row">
          <Box flex="1">{children}</Box>
          {state.isChecked ? (
            <Circle bg="accent" size="4">
              <Icon as={CheckIcon} boxSize="2.5" color="inverted" />
            </Circle>
          ) : (
            <Circle borderWidth="2px" size="4" />
          )}
        </Stack>
      </Box>
    </Box>
  );
};

const CheckIcon = createIcon({
  displayName: "CheckIcon",
  viewBox: "0 0 12 10",
  path: (
    <polyline
      fill="none"
      strokeWidth="2px"
      stroke="currentColor"
      strokeDasharray="16px"
      points="1.5 6 4.5 9 10.5 1"
    />
  ),
});

// eslint-disable-next-line
export const PetBasics = ({ currentStep, setStep }: any) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const options = [
    {
      label: "Adoption ❤️",
      description: "I'm a dog lover looking to give a dog a forever home",
    },
    {
      label: "Rehoming 🐶",
      description: "I'm a dog-owner looking to rehome my dogs",
    },
    {
      label: "Services 🐾",
      description: "I'm a dog professional looking to provide care for dogs",
    },
  ];

  // const onBack = () => {
  //   setStep(currentStep - 1);
  // };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Stack as="form" spacing="9" onSubmit={(event) => onSubmit(event)}>
      <Heading size="md">
        Nice to meet you, {user.displayName}. What brings you to Doghouse?
      </Heading>
      <RadioCardGroup defaultValue="one" spacing="3">
        {options.map((option) => (
          <RadioCard key={option.label} value={option.label}>
            <Text color="emphasized" fontWeight="medium" fontSize="sm">
              {option.label}
            </Text>
            <Text color="muted" fontSize="sm">
              {option.description}
            </Text>
          </RadioCard>
        ))}
      </RadioCardGroup>

      <ButtonGroup width="100%">
        {/* <Button
          onClick={() => onBack}
          isDisabled={currentStep === 0}
          variant="ghost"
        >
          Back
        </Button> */}
        <Spacer />
        <Button
          isLoading={loading}
          type="submit"
          isDisabled={currentStep >= 3}
          variant="primary"
        >
          Next
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
