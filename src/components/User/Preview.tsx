import type { User } from '../../typings/user';
import type { JSXElement } from 'solid-js';
import { Link } from 'solid-app-router';

export interface UserPreviewProps {
	user: User;
	uid: string;
}

const UserPreview = (props: UserPreviewProps): JSXElement => {
	return (
		<Link href={`/users/${props.uid}`}>
			<h3>{props.user.user.username}</h3>
		</Link>
	);
};

export default UserPreview;
