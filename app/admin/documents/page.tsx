'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

interface Document {
  _id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  shipment: {
    exportType: string;
    originCountry: string;
    destinationCountry: string;
  };
  verifiedBy?: {
    firstName: string;
    lastName: string;
  };
}

export default function DocumentVerification() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/documents', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDocument = async (status: 'verified' | 'rejected') => {
    if (!selectedDocument) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/documents', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          documentId: selectedDocument._id,
          status,
        }),
      });

      if (response.ok) {
        setToast({ message: `Document ${status} successfully`, type: 'success' });
        fetchDocuments();
        setIsVerifyModalOpen(false);
        setSelectedDocument(null);
      } else {
        setToast({ message: 'Failed to verify document', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Failed to verify document', type: 'error' });
    }
  };

  const formatDocumentType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-darkBlue mb-2">Document Verification</h1>
        <p className="text-neutral-gray">Review and verify uploaded documents</p>
      </div>

      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Document Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">File Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Shipment</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-darkBlue">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id} className="border-b border-gray-100 hover:bg-neutral-lightGray transition">
                    <td className="py-3 px-4">
                      <div className="font-medium text-neutral-darkBlue">
                        {formatDocumentType(doc.documentType)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-gray">{doc.fileName}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="font-medium text-neutral-darkBlue">
                          {doc.user.firstName} {doc.user.lastName}
                        </div>
                        <div className="text-neutral-gray text-xs">{doc.user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-gray">
                      <div className="text-sm">
                        <div className="capitalize">{doc.shipment.exportType}</div>
                        <div className="text-xs">{doc.shipment.originCountry} → {doc.shipment.destinationCountry}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${
                        doc.status === 'verified'
                          ? 'badge-delivered'
                          : doc.status === 'rejected'
                          ? 'badge-rejected'
                          : 'badge-pending'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {doc.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => {
                              setSelectedDocument(doc);
                              setIsVerifyModalOpen(true);
                            }}
                          >
                            Review
                          </Button>
                        </div>
                      )}
                      {doc.status !== 'pending' && (
                        <span className="text-neutral-gray text-sm">
                          Verified by {doc.verifiedBy?.firstName} {doc.verifiedBy?.lastName}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Verify Modal */}
      <Modal
        isOpen={isVerifyModalOpen}
        onClose={() => {
          setIsVerifyModalOpen(false);
          setSelectedDocument(null);
        }}
        title="Verify Document"
      >
        <div className="space-y-4">
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-2">Document Type</p>
            <p className="font-medium text-neutral-darkBlue">
              {selectedDocument && formatDocumentType(selectedDocument.documentType)}
            </p>
          </div>
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-2">File Name</p>
            <p className="font-medium text-neutral-darkBlue">{selectedDocument?.fileName}</p>
          </div>
          <div className="p-4 bg-neutral-lightGray rounded-lg">
            <p className="text-sm text-neutral-gray mb-2">Uploaded By</p>
            <p className="font-medium text-neutral-darkBlue">
              {selectedDocument?.user.firstName} {selectedDocument?.user.lastName}
            </p>
          </div>
          {selectedDocument?.fileUrl && (
            <div>
              <a
                href={selectedDocument.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean-sky hover:underline"
              >
                View Document
              </a>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="success" onClick={() => handleVerifyDocument('verified')}>
              Approve
            </Button>
            <Button variant="danger" onClick={() => handleVerifyDocument('rejected')}>
              Reject
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
