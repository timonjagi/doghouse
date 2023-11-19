import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
// import { Group } from "../../../atoms/communitiesAtom";
import { fireStore } from "../../../lib/firebase/client";
import safeJsonStringify from "safe-json-stringify";
// import Communities from "../../../components/Navbar/Directory/Communities";
import GroupNotFound from "../../../lib/pages/group/GroupNotFound";
import Header from "../../../lib/pages/group/Header";
import PageContent from "../../../lib/layout/PageContent";
import CreatePostLink from "../../../lib/pages/group/Posts/CreatePostLink";
import Posts from "../../../lib/pages/group/Posts/PostsList";
import PostsList from "../../../lib/pages/group/Posts/PostsList";
import { Group } from "atoms/groupsAtom";

type groupPageProps = {
  groupData: Group;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const groupDocRef = doc(
      fireStore,
      "groups",
      context.query.groupId as string
    );

    const groupDoc = await getDoc(groupDocRef);

    return {
      props: {
        groupData: groupDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: groupDoc.id, ...groupDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error", error);
    throw error;
  }
}

const groupPage: React.FC<groupPageProps> = ({ groupData }) => {
  console.log(groupData);
  if (!groupData) {
    return <GroupNotFound />;
  }
  return (
    <>
      <Header groupData={groupData} />

      <PageContent>
        <>
          <CreatePostLink />

          <PostsList groupData={groupData} />
        </>
        <>
          <div>Right hand side</div>
        </>
      </PageContent>
    </>
  );
};

export default groupPage;
