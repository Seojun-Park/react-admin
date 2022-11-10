import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    CloneButton,
    ChipField,
    Datagrid,
    DateField,
    EditButton,
    NumberField,
    ReferenceArrayField,
    ReferenceManyField,
    RichTextField,
    SelectField,
    ShowContextProvider,
    ShowView,
    SingleFieldList,
    Tab,
    TabbedShowLayout,
    TextField,
    UrlField,
    useShowController,
    useLocaleState,
    useRecordContext,
    TopToolbar,
    Form,
    ReferenceInput,
    SelectInput,
} from 'react-admin';
import PostTitle from './PostTitle';

const CreateRelatedComment = () => {
    const record = useRecordContext();
    return (
        <CloneButton
            resource="comments"
            label="Add comment"
            record={{ post_id: record.id }}
        />
    );
};

const PostAction = () => {
    const [opened, setOpened] = React.useState<boolean>();

    const optionLabel = r => {
        return `${r.name} ${r.id}`;
    };
    return (
        <TopToolbar>
            <>
                <Button onClick={() => setOpened(!opened)}>button</Button>
                <Dialog open={opened}>
                    <Form>
                        <DialogTitle>title</DialogTitle>
                        <DialogContent>
                            <ReferenceInput source="user_id" reference="users">
                                <SelectInput
                                    label="User"
                                    resettable
                                    fullWidth
                                    optionText={optionLabel}
                                />
                            </ReferenceInput>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpened(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </>
        </TopToolbar>
    );
};

const PostShow = () => {
    const controllerProps = useShowController();
    const [locale] = useLocaleState();
    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView actions={<PostAction />} title={<PostTitle />}>
                <TabbedShowLayout>
                    <Tab label="post.form.summary">
                        <TextField source="id" />
                        <TextField source="title" />
                        {controllerProps.record &&
                            controllerProps.record.title ===
                                'Fusce massa lorem, pulvinar a posuere ut, accumsan ac nisi' && (
                                <TextField source="teaser" />
                            )}
                        <ArrayField source="backlinks">
                            <Datagrid bulkActionButtons={false}>
                                <DateField source="date" />
                                <UrlField source="url" />
                            </Datagrid>
                        </ArrayField>
                    </Tab>
                    <Tab label="post.form.body">
                        <RichTextField
                            source="body"
                            stripTags={false}
                            label={false}
                        />
                    </Tab>
                    <Tab label="post.form.miscellaneous">
                        <ReferenceArrayField
                            reference="tags"
                            source="tags"
                            sort={{ field: `name.${locale}`, order: 'ASC' }}
                        >
                            <SingleFieldList>
                                <ChipField source={`name.${locale}`} />
                            </SingleFieldList>
                        </ReferenceArrayField>
                        <DateField source="published_at" />
                        <SelectField
                            source="category"
                            choices={[
                                { name: 'Tech', id: 'tech' },
                                { name: 'Lifestyle', id: 'lifestyle' },
                            ]}
                        />
                        <NumberField source="average_note" />
                        <BooleanField source="commentable" />
                        <TextField source="views" />
                        <CloneButton />
                    </Tab>
                    <Tab label="post.form.comments">
                        <ReferenceManyField
                            reference="comments"
                            target="post_id"
                            sort={{ field: 'created_at', order: 'DESC' }}
                        >
                            <Datagrid>
                                <DateField source="created_at" />
                                <TextField source="author.name" />
                                <TextField source="body" />
                                <EditButton />
                            </Datagrid>
                        </ReferenceManyField>
                        <CreateRelatedComment />
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        </ShowContextProvider>
    );
};

export default PostShow;
