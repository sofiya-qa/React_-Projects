
import React, { useState } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  TextField,
  DefaultButton,
  PrimaryButton,
  Dialog,
  DialogFooter,
  Stack,
} from "@fluentui/react";
import "./App.css"; 

const AdminDashboard = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Sofiya Ansari", email: "sofiya64@gmail.com", role: "Admin" },
    { id: 2, name: "John Smith", email: "johnsmith@yahoo.com", role: "User" },
    { id: 3, name: "Nishi Shah", email: "nishi25@gmail.com", role: "QA" },
    { id: 4, name: "Uzma Khan", email: "uzma123@yahoo.com", role: "Developer" },
    { id: 5, name: "Tim Donna", email: "timdonna89@gmail.com", role: "User" },
    { id: 6, name: "Kris Kelly", email: "kelly784@gmail.com", role: "QA" },
    { id: 7, name: "Adity Vakil", email: "adityvakil@gmail.com", role: "Tester" },
  ]);

  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  const columns = [
    { key: "name", name: "Name", fieldName: "name", minWidth: 100 },
    { key: "email", name: "Email", fieldName: "email", minWidth: 150 },
    { key: "role", name: "Role", fieldName: "role", minWidth: 100 },
    {
      key: "actions",
      name: "Actions",
      minWidth: 200,
      onRender: (item) => (
        <Stack horizontal className="button-spacing">
          <PrimaryButton text="Edit" onClick={() => editItem(item)} />
          <PrimaryButton
            text="Delete"
            onClick={() => confirmDelete(item.id)}
            className="delete-button"
          />
        </Stack>
      ),
    },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const editItem = (item) => {
    setFormData(item);
    setSelectedItem(item.id);
    setIsDialogOpen(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const deleteItem = () => {
    setItems(items.filter((item) => item.id !== deleteId));
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleAddOrUpdate = () => {
    if (selectedItem) {
      setItems(items.map((item) => (item.id === selectedItem ? formData : item)));
    } else {
      setItems([...items, { ...formData, id: items.length + 1 }]);
    }
    setIsDialogOpen(false);
    setFormData({ name: "", email: "", role: "" });
    setSelectedItem(null);
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <TextField
        placeholder="Search by name"
        value={searchText}
        onChange={(e, newValue) => setSearchText(newValue || "")}
        className="search-box"
      />

      <PrimaryButton text="Add User" onClick={() => setIsDialogOpen(true)} />

      <DetailsList
        items={filteredItems}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
        styles={{ root: { marginTop: 10 } }}
      />

      
      <Dialog hidden={!isDialogOpen} onDismiss={() => setIsDialogOpen(false)}>
        <h3>{selectedItem ? "Edit User" : "Add User"}</h3>

        <TextField
          label="Name"
          value={formData.name}
          onChange={(e, newValue) => setFormData({ ...formData, name: newValue || "" })}
        />

        <TextField
          label="Email"
          value={formData.email}
          onChange={(e, newValue) => setFormData({ ...formData, email: newValue || "" })}
        />

        <TextField
          label="Role"
          value={formData.role}
          onChange={(e, newValue) => setFormData({ ...formData, role: newValue || "" })}
        />

        <DialogFooter>
          <PrimaryButton text="Save" onClick={handleAddOrUpdate} />
          <DefaultButton text="Cancel" onClick={() => setIsDialogOpen(false)} />
        </DialogFooter>
      </Dialog>

      
      <Dialog hidden={!isDeleteDialogOpen} onDismiss={() => setIsDeleteDialogOpen(false)}>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this user?</p>
        <DialogFooter>
          <PrimaryButton text="Delete" onClick={deleteItem} className="delete-button" />
          <DefaultButton text="Cancel" onClick={() => setIsDeleteDialogOpen(false)} />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
