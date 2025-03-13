import { Feather } from "@expo/vector-icons";

export const icon: Record<'index' | 'post' | 'search', (props: any) => JSX.Element> = {
    index: (props) => <Feather name="home" size={24} color={'#222'} {...props} />,
    post: (props) => <Feather name="plus" size={24} color={'#222'} {...props} />,
    search: (props) => <Feather name="search" size={24} color={'#222'} {...props} />,
};