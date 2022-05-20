import * as React from 'react';
import { useMemo } from 'react';
import {
    AutocompleteInput,
    Create,
    required,
    ReferenceInput,
    SaveButton,
    SimpleForm,
    TextInput,
    Toolbar,
    useNotify,
    useRedirect,
    AutocompleteInputProps,
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';
import { UserRecord } from '../type';

const PostCreateToolbar = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const { reset } = useFormContext();

    return (
        <Toolbar>
            <SaveButton label="post.action.save_and_edit" variant="text" />
            <SaveButton
                label="post.action.save_and_show"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: data => {
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                        redirect('show', 'posts', data.id);
                    },
                }}
            />
            <SaveButton
                label="post.action.save_and_add"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: () => {
                        reset();
                        window.scrollTo(0, 0);
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                    },
                }}
            />
            <SaveButton
                label="post.action.save_with_average_note"
                type="button"
                variant="text"
                mutationOptions={{
                    onSuccess: data => {
                        notify('ra.notification.created', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                        });
                        redirect('show', 'posts', data.id);
                    },
                }}
                transform={data => ({ ...data, average_note: 10 })}
            />
        </Toolbar>
    );
};

const PostCreate = () => {
    const defaultValues = useMemo(
        () => ({
            average_note: 0,
        }),
        []
    );

    const autoCompleteOptions: Pick<
        AutocompleteInputProps,
        'optionText' | 'inputText' | 'matchSuggestion'
    > = {
        optionText: (choice?: UserRecord) => {
            if (!choice?.id) {
                return 'non';
            }

            return <div>{choice.name}</div>;
        },
        inputText: (choice: UserRecord) => choice?.name || '',
        matchSuggestion: (_: string, choice: UserRecord) =>
            Boolean(choice?.name),
    };

    return (
        <Create redirect="edit">
            <SimpleForm
                toolbar={<PostCreateToolbar />}
                defaultValues={defaultValues}
            >
                <TextInput
                    autoFocus
                    source="title"
                    validate={required('Required field')}
                />
                <TextInput
                    source="teaser"
                    fullWidth
                    multiline
                    validate={required('Required field')}
                />
                <ReferenceInput
                    source="user"
                    reference="users"
                    filter={{ show: true }}
                >
                    <AutocompleteInput
                        {...autoCompleteOptions}
                        fullWidth={true}
                    />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};

export default PostCreate;

// const DependantInput = ({
//     dependency,
//     children,
// }: {
//     dependency: string;
//     children: JSX.Element;
// }) => {
//     const dependencyValue = useWatch({ name: dependency });

//     return dependencyValue ? children : null;
// };
