import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { ContactInfo } from '../../internalTypes/contactInfo';
import { LoadingSpinner } from '../LoadingSpinner';

const predefinedContacts: ContactInfo[] = [
  { id: '1', label: 'Facebook', info: '', description: '' },
  { id: '2', label: 'Snapchat', info: '', description: '' },
  { id: '3', label: 'Messenger', info: '', description: '' },
  { id: '4', label: 'Whatsapp', info: '', description: '' },
  { id: '5', label: 'Instagram', info: '', description: '' },
  { id: '6', label: 'Twitter', info: '', description: '' },
  { id: '7', label: 'Discord', info: '', description: '' },
  { id: '8', label: 'Telegram', info: '', description: '' },
];
const fetchContactInfo = async () => {
  return pacebuddiesApi
    .get('bridge/athlete/contactinfo')
    .then((res) => res.data);
};

const updateContactInfo = async (contactInfo: ContactInfo) => {
  if (contactInfo.info.length === 0 || contactInfo.label.length === 0) {
    throw new Error('Contact info and label must not be empty');
  }
  if (
    contactInfo.info.length > 255 ||
    contactInfo.label.length > 255 ||
    contactInfo.description.length > 255
  ) {
    throw new Error(
      'Contact info, label and description must be less than 255 characters',
    );
  }

  if (predefinedContacts.find((contact) => contact.id === contactInfo.id)) {
    const { id, ...rest } = contactInfo;
    return pacebuddiesApi
      .post('bridge/athlete/contactinfo', { ...rest })
      .then((res) => res.data);
  }
  return pacebuddiesApi
    .post('bridge/athlete/contactinfo', { ...contactInfo })
    .then((res) => res.data);
};

const addContactInfo = async (contactInfo: ContactInfo) => {
  if (contactInfo.info.length === 0 || contactInfo.label.length === 0) {
    throw new Error('Contact info and label must not be empty');
  }
  if (
    contactInfo.info.length > 255 ||
    contactInfo.label.length > 255 ||
    contactInfo.description.length > 255
  ) {
    throw new Error(
      'Contact info, label and description must be less than 255 characters',
    );
  }
  return pacebuddiesApi
    .post('bridge/athlete/contactinfo', { ...contactInfo })
    .then((res) => res.data);
};

const deleteContactInfo = async (contactInfo: ContactInfo) => {
  if (contactInfo.info.length === 0 || contactInfo.label.length === 0) {
    throw new Error('Contact info and label must not be empty');
  }
  if (
    contactInfo.info.length > 255 ||
    contactInfo.label.length > 255 ||
    contactInfo.description.length > 255
  ) {
    throw new Error(
      'Contact info, label and description must be less than 255 characters',
    );
  }
  return pacebuddiesApi
    .delete(`bridge/athlete/contactinfo`, { data: { ...contactInfo } })
    .then((res) => res.data);
};

const ContactInfoComponent: React.FC = () => {
  const {
    data: fetchedContactInfoList,
    isLoading,
    error,
  } = useQuery<ContactInfo[], Error>({
    queryKey: ['contactInfo'],
    queryFn: fetchContactInfo,
  });

  const contactInfoList = fetchedContactInfoList
    ? [
        ...fetchedContactInfoList,
        ...predefinedContacts.filter(
          (predefinedContact) =>
            !fetchedContactInfoList.find(
              (contact) => contact.label === predefinedContact.label,
            ),
        ),
      ]
    : predefinedContacts;

  const queryClient = useQueryClient();
  const mutation = useMutation(updateContactInfo, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success('Contact info updated successfully');
      queryClient.invalidateQueries(['contactInfo']);
    },
    onError: (error, variables, rollback) => {
      // @ts-ignore
      toast.error(`Failed to update contact info: ${error.message}`);
      // You can implement rollback here if needed
    },
  });

  const addMutation = useMutation(addContactInfo, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success('Contact info added successfully');
      queryClient.invalidateQueries(['contactInfo']);
    },
    onError: (error, variables, rollback) => {
      // @ts-ignore
      toast.error(`Failed to add contact info: ${error.message}`);
      // You can implement rollback here if needed
    },
  });

  const deleteMutation = useMutation(deleteContactInfo, {
    onSuccess: () => {
      // Invalidate and refetch
      toast.success('Contact info deleted successfully');
      queryClient.invalidateQueries(['contactInfo']);
    },
    onError: (error, variables, rollback) => {
      // @ts-ignore
      toast.error(`Failed to delete contact info: ${error.message}`);
      // You can implement rollback here if needed
    },
  });
  const [editData, setEditData] = useState<ContactInfo | null>(null);
  const [newData, setNewData] = useState<ContactInfo>({
    id: '',
    label: '',
    info: '',
    description: '',
  });

  const handleEdit = (data: ContactInfo) => {
    setEditData(data);
  };

  const handleSave = async () => {
    if (editData) {
      await mutation.mutateAsync(editData);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditData(null);
  };

  const handleAdd = async () => {
    await addMutation.mutateAsync(newData);
    setNewData({ id: '', label: '', info: '', description: '' });
  };

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error loading contact information</div>;

  return (
    <div>
      <span className="small-caps text-xl font-bold text-pb-dark-gray ">
        Contact Information
      </span>
      <div className="flex w-2/3 md:w-1/2 border-t-2 border-t-pb-green mb-1"/>
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        {contactInfoList.map((contactInfo) => (
          <div key={contactInfo.id}>
            {editData?.id === contactInfo.id ? (
              <div>
                <input
                  value={editData.label}
                  onChange={(e) =>
                    setEditData({ ...editData, label: e.target.value })
                  }
                  type={'text'}
                  className="border-[1px] border-pb-green text-pb-dark-gray"
                />
                <input
                  value={editData.info}
                  type={'text'}
                  className="border-[1px] border-pb-green text-pb-dark-gray"
                  onChange={(e) =>
                    setEditData({ ...editData, info: e.target.value })
                  }
                />
                <input
                  value={editData.description}
                  type={'text'}
                  className="border-[1px] border-pb-green text-pb-dark-gray"
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
                <div className="flex">
                  <Button
                    outline={true}
                    gradientDuoTone={'greenToDarkGreen'}
                    className="mr-2 mt-2 shrink-0"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    outline={true}
                    gradientDuoTone={'greenToDarkGreen'}
                    className="mt-2 shrink-0"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    outline={true}
                    gradientDuoTone={'redToDarkRed'}
                    className="ml-2 mt-2 shrink-0"
                    onClick={() => deleteMutation.mutate(contactInfo)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p>{contactInfo.label}</p>
                <p className="truncate">{contactInfo.description}</p>

                <Button
                  outline={true}
                  gradientDuoTone={'greenToDarkGreen'}
                  className="mt-2 shrink-0"
                  onClick={() => handleEdit(contactInfo)}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <span className="small-caps text-lg font-bold text-pb-dark-gray ">
        Add new Contact Information
      </span>
      <div className="flex w-[40%] flex-col">
        <div>
          <input
            placeholder="Label"
            type={'text'}
            className="border-[1px] border-pb-green text-pb-dark-gray"
            value={newData.label}
            onChange={(e) => setNewData({ ...newData, label: e.target.value })}
          />
          <input
            type={'text'}
            placeholder="Info/Link"
            value={newData.info}
            onChange={(e) => setNewData({ ...newData, info: e.target.value })}
            className="border-[1px] border-pb-green text-pb-dark-gray"
          />
        </div>
        <textarea
          placeholder="Description"
          value={newData.description}
          onChange={(e) =>
            setNewData({ ...newData, description: e.target.value })
          }
          className="mt-1 border-[1px] border-pb-green text-pb-dark-gray"
        />
        <div>
          <Button
            outline={true}
            gradientDuoTone={'greenToDarkGreen'}
            className="mt-2 shrink-0"
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoComponent;
