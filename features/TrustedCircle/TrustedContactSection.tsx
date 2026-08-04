export default function TrustedContactSection() {
    const {
        totalContactsCount,
        filteredContacts,
        searchQuery,
        setSearchQuery,
        editingContactId,
        handleEdit,
        handleRemove,
    } = useTrustedContacts();

    return (
        <ContactList
            totalContactsCount={totalContactsCount}
            filteredContacts={filteredContacts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            editingContactId={editingContactId}
            onEdit={handleEdit}
            onRemove={handleRemove}
        />
    );
}