import React, {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';

const HtmlEditor = ({initialState, setContent}) => {
    const [state] = useState(initialState);
    const editorRef = useRef(null);

    return (
        <Editor
            onEditorChange={(e) => {
                setContent(e);
            }}
            onInit={(evt, editor) => {
                setTimeout(() => {
                    const btnClose = document.getElementsByClassName('tox-notification__dismiss')[0];
                    if (btnClose != null) btnClose.click();
                }, 100);

                return editorRef.current = editor;

            }}
            initialValue={state}
            init={{
                height: 200,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | ' +
                    'bold italic underline backcolor link | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
    );
};

export default HtmlEditor;
