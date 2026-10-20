declare module 'react-insta-stories' {
    import * as React from 'react';

    interface StoryObject {
        url?: string;
        type?: 'image' | 'video';
        duration?: number;
        header?: { heading: string; subheading?: string; profileImage?: string };
    }

    interface StoriesProps {
        stories: (string | StoryObject)[];
        defaultInterval?: number;
        width?: number | string;
        height?: number | string;
        loop?: boolean;
        onAllStoriesEnd?: () => void;
        onStoryStart?: (index: number) => void;
        onStoryEnd?: (index: number) => void;
    }

    const Stories: React.FC<StoriesProps>;
    export default Stories;
}