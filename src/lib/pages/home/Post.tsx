import {
  Stack,
  HStack,
  Avatar,
  AvatarBadge,
  Box,
  Text,
  useColorModeValue,
  Button,
  Divider,
  Flex,
  Icon,
  Spacer,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { fireStore } from "lib/firebase/client";
import moment from "moment";
import React, { useState } from "react";
import { FiHeart, FiMapPin, FiMoreVertical, FiTrash2 } from "react-icons/fi";

type PostProps = {
  post: any;
  userProfile: any;
  onViewPost: any;
};

const Post: React.FC<PostProps> = ({ post, userProfile, onViewPost }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const ownPost = [post.userId, post.ownerId, post.seekerId].includes(
    userProfile.userId
  );

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
  });

  const onSearch = () => {};

  const onFilter = () => {};

  const onSort = () => {};

  const onDelete = () => {};

  const onLike = async () => {
    setLoading(true);
    try {
      const activityDocRef = doc(fireStore, "activity", post.id as string);
      await updateDoc(activityDocRef, {
        likeCount: post.likeCount + 1,
      });

      post.likeCount = post.likeCount + 1;

      toast({
        title: "Post liked successfully",
        status: "success",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error liking post",
        description: error.message,
        status: "error",
      });
    }
  };

  const onMakeOffer = () => {};

  function getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === highlight?.toLowerCase() ? (
            <b>
              <a style={{ color: "#AC8A65" }} href={`/breeds/${post.petBreed}`}>
                {part}
              </a>
            </b>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  return (
    <Box
      bg="bg-surface"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      borderRadius="lg"
    >
      <Stack key={post.id} fontSize="sm" p="4" spacing="4">
        <Stack direction="row" justify="space-between" spacing="2">
          <HStack spacing="3">
            <Avatar src={post.userProfilePhotoUrl} boxSize="10">
              <AvatarBadge boxSize="4" bg="postive" />
            </Avatar>
            <Box>
              <Text fontWeight="medium" color="emphasized">
                {post.userName}
              </Text>
              <HStack>
                <Icon as={FiMapPin} color="subtle" />
                <Text color="subtle">{post.userLocation}</Text>
              </HStack>
            </Box>
          </HStack>
          <Text color="muted">{moment(post.createdAt).fromNow()}</Text>
        </Stack>
        <Text
          color="muted"
          sx={{
            "-webkit-box-orient": "vertical",
            "-webkit-line-clamp": "2",
            overflow: "hidden",
            display: "-webkit-box",
          }}
        >
          {getHighlightedText(post.description, post.petBreed)}
        </Text>

        <Divider />

        <Flex direction="row-reverse">
          {ownPost && (
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              colorScheme="danger"
              onClick={onDelete}
            >
              <FiTrash2 />
              {!isMobile && <Text ml="2">Delete</Text>}
            </Button>
          )}
        </Flex>
      </Stack>
    </Box>
  );
};
export default Post;
