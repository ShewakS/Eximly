'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExportForm() {
  const router = useRouter();
  const [type, setType] = useState('domestic');
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    originCountry: '',
    destinationCountry: '',
    passportNumber: '',
    customsDeclarationId: '',
    exportLicenseNumber: '',
    shippingMethod: 'air'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, exportType: type, quantity: parseInt(formData.quantity) }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create shipment');
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-lightGray px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="card max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-neutral-dark">Create New Shipment</h1>
          
          {error && (
            <div
              className="border border-status-danger text-status-danger px-4 py-3 rounded-lg mb-6 status-box-danger"
            >
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid-responsive-3">
              <div>
                <label>Product Name</label>
                <input 
                  type="text" 
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                  required 
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label>Quantity</label>
                <input 
                  type="number" 
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required 
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label>Export Type</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div>
                <label>Origin Country</label>
                <input 
                  type="text" 
                  value={formData.originCountry}
                  onChange={(e) => setFormData({...formData, originCountry: e.target.value})}
                  required 
                  placeholder="Enter origin country"
                />
              </div>
              <div>
                <label>Destination Country</label>
                <input 
                  type="text" 
                  value={formData.destinationCountry}
                  onChange={(e) => setFormData({...formData, destinationCountry: e.target.value})}
                  required 
                  placeholder="Enter destination country"
                />
              </div>
            </div>

            {/* Conditional International Fields */}
            {type === 'international' && (
              <div
                className="border-t border-gray-200 grid-responsive-3 export-section-header"
              >
                <div className="col-span-full">
                  <h3 className="text-xl font-semibold text-primary-indigo mb-4">International Documentation</h3>
                </div>
                <div>
                  <label>Passport Number</label>
                  <input 
                    type="text" 
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                    placeholder="Enter passport number"
                  />
                </div>
                <div>
                  <label>Customs Declaration ID</label>
                  <input 
                    type="text" 
                    value={formData.customsDeclarationId}
                    onChange={(e) => setFormData({...formData, customsDeclarationId: e.target.value})}
                    placeholder="Enter customs ID"
                  />
                </div>
                <div>
                  <label>Export License Number</label>
                  <input 
                    type="text" 
                    value={formData.exportLicenseNumber}
                    onChange={(e) => setFormData({...formData, exportLicenseNumber: e.target.value})}
                    placeholder="Enter license number"
                  />
                </div>
                <div>
                  <label>Shipping Method</label>
                  <select 
                    value={formData.shippingMethod}
                    onChange={(e) => setFormData({...formData, shippingMethod: e.target.value})}
                  >
                    <option value="air">Air Freight</option>
                    <option value="sea">Sea Freight</option>
                  </select>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Shipment...' : 'Create Shipment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}