import React, { useState } from 'react';
import { Copy, Check, Code, FileText, Palette } from 'lucide-react';

interface CodeBlockProps {
  title: string;
  language: string;
  code: string;
  icon: React.ReactNode;
  bgColor: string;
  onCodeChange: (code: string) => void;
}

function CodeBlock({ title, language, code, icon, bgColor, onCodeChange }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className={`${bgColor} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="text-white">{icon}</div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <span className="text-white/80 text-sm bg-white/20 px-2 py-1 rounded">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded text-sm transition-colors duration-200"
          >
            {isEditing ? 'Preview' : 'Edit'}
          </button>
        </div>
        
        {isEditing ? (
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className="w-full h-80 p-6 pr-20 bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:bg-white border-0"
            spellCheck={false}
          />
        ) : (
          <pre className="bg-gray-50 p-6 pr-20 overflow-x-auto">
            <code className="font-mono text-sm text-gray-800 whitespace-pre">
              {code}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}

function App() {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Railway Booking System</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Animate.css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body x-data="bookingApp()" x-init="init()">
    <!-- Light Blue Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light-blue sticky-top shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold text-white" href="#" @click.prevent="showPage('home')">
                🚂 Railway Booking
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#" @click.prevent="showPage('home')" 
                           :class="{'active fw-bold': currentPage === 'home'}">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#" @click.prevent="showPage('search')" 
                           :class="{'active fw-bold': currentPage === 'search'}">Search Trains</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#" @click.prevent="showPage('history')" 
                           :class="{'active fw-bold': currentPage === 'history'}">Booking History</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Home Page -->
    <div x-show="currentPage === 'home'" x-transition:enter="animate__animated animate__fadeIn" class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
                <h1 class="display-4 mb-4 text-primary">Welcome to Railway Booking System</h1>
                <p class="lead mb-4">Search trains, check seat availability, and book your tickets seamlessly</p>
                <button class="btn btn-primary btn-lg px-4" @click="showPage('search')">
                    🔍 Search Trains
                </button>
            </div>
        </div>
    </div>

    <!-- Train Search Page -->
    <div x-show="currentPage === 'search'" x-transition:enter="animate__animated animate__fadeIn" class="container py-4">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <h2 class="text-center mb-4">Train Search & Seat Availability</h2>
                
                <!-- Search Form -->
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <form @submit.prevent="performSearch()">
                            <div class="row g-3">
                                <div class="col-md-3">
                                    <label class="form-label">From Station</label>
                                    <select class="form-select" x-model="searchForm.from" required>
                                        <option value="">Select Origin</option>
                                        <template x-for="station in stations" :key="station">
                                            <option :value="station" x-text="station"></option>
                                        </template>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">To Station</label>
                                    <select class="form-select" x-model="searchForm.to" required>
                                        <option value="">Select Destination</option>
                                        <template x-for="station in stations" :key="station">
                                            <option :value="station" x-text="station"></option>
                                        </template>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">Travel Date</label>
                                    <input type="date" class="form-control" x-model="searchForm.date" 
                                           :min="dayjs().format('YYYY-MM-DD')" required>
                                </div>
                                <div class="col-md-3 d-flex align-items-end">
                                    <button type="submit" class="btn btn-primary w-100">
                                        🔍 Search Trains
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Search Results -->
                <div x-show="searchResults.length > 0" x-transition:enter="animate__animated animate__fadeIn">
                    <h4 class="mb-3">Available Trains</h4>
                    <template x-for="train in searchResults" :key="train.trainNumber">
                        <div class="card mb-3 shadow-sm border-hover">
                            <div class="card-body">
                                <!-- Train Header -->
                                <div class="row align-items-center mb-3">
                                    <div class="col-md-4">
                                        <h5 class="mb-1" x-text="train.trainName"></h5>
                                        <small class="text-muted" x-text="train.trainNumber"></small>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="text-center">
                                                <div class="fw-bold" x-text="train.departure"></div>
                                                <small x-text="train.from"></small>
                                            </div>
                                            <div class="px-3">
                                                <div class="text-center">→</div>
                                                <div><small x-text="train.duration"></small></div>
                                            </div>
                                            <div class="text-center">
                                                <div class="fw-bold" x-text="train.arrival"></div>
                                                <small x-text="train.to"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 text-end">
                                        <button class="btn btn-outline-primary btn-sm me-2" 
                                                @click="toggleTrainDetails(train.trainNumber)">
                                            <span x-show="!expandedTrains.includes(train.trainNumber)">📋 Details</span>
                                            <span x-show="expandedTrains.includes(train.trainNumber)">🔼 Hide</span>
                                        </button>
                                        <button class="btn btn-success btn-sm" 
                                                @click="startBooking(train)">
                                            📝 Book Now
                                        </button>
                                    </div>
                                </div>

                                <!-- Seat Availability -->
                                <div class="row g-2 mb-3">
                                    <template x-for="[className, classData] in Object.entries(train.classes)" :key="className">
                                        <div class="col-auto">
                                            <div class="border rounded p-2 text-center bg-light">
                                                <div class="fw-bold small" x-text="className"></div>
                                                <div class="small" 
                                                     :class="{
                                                         'text-success': classData.available === 'Available',
                                                         'text-warning': classData.available.includes('RAC'),
                                                         'text-danger': classData.available.includes('WL')
                                                     }" 
                                                     x-text="classData.available"></div>
                                                <div class="small text-muted">₹<span x-text="classData.fare"></span></div>
                                            </div>
                                        </div>
                                    </template>
                                </div>

                                <!-- Expandable Details -->
                                <div x-show="expandedTrains.includes(train.trainNumber)" 
                                     x-transition:enter="animate__animated animate__slideInDown"
                                     x-transition:leave="animate__animated animate__slideOutUp"
                                     class="border-top pt-3 mt-3">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h6>Train Information</h6>
                                            <p><strong>Distance:</strong> <span x-text="train.distance"></span></p>
                                            <p><strong>Runs On:</strong> <span x-text="train.runsOn.join(', ')"></span></p>
                                        </div>
                                        <div class="col-md-6">
                                            <h6>Class Details</h6>
                                            <template x-for="[className, classData] in Object.entries(train.classes)" :key="className">
                                                <div class="mb-2">
                                                    <strong x-text="className"></strong>: 
                                                    <span x-text="classData.available"></span> 
                                                    (₹<span x-text="classData.fare"></span>)
                                                    - <span x-text="classData.seats"></span> seats
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- No Results -->
                <div x-show="searchPerformed && searchResults.length === 0" 
                     x-transition:enter="animate__animated animate__fadeIn"
                     class="text-center py-5">
                    <h4>No trains found</h4>
                    <p class="text-muted">No trains available for the selected route. Please try different stations.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Booking Page -->
    <div x-show="currentPage === 'booking'" x-transition:enter="animate__animated animate__fadeIn" class="container py-4">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <h2 class="text-center mb-4">Book Your Ticket</h2>

                <!-- Selected Train Info -->
                <div x-show="selectedTrain" class="card mb-4 border-primary">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Selected Train Details</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <h6 x-text="selectedTrain?.trainName + ' (' + selectedTrain?.trainNumber + ')'"></h6>
                                <p class="mb-2">
                                    <strong>Route:</strong> 
                                    <span x-text="selectedTrain?.from + ' → ' + selectedTrain?.to"></span>
                                </p>
                                <p class="mb-2">
                                    <strong>Departure:</strong> <span x-text="selectedTrain?.departure"></span> | 
                                    <strong>Arrival:</strong> <span x-text="selectedTrain?.arrival"></span>
                                </p>
                                <p class="mb-0">
                                    <strong>Date:</strong> <span x-text="dayjs(searchForm.date).format('DD MMM YYYY')"></span>
                                </p>
                            </div>
                            <div class="col-md-4" x-show="bookingForm.selectedClass">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <div class="fw-bold">Selected Class</div>
                                        <div class="h5 text-primary" x-text="bookingForm.selectedClass"></div>
                                        <div class="text-muted">₹<span x-text="bookingForm.fare"></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Class Selection -->
                <div x-show="!bookingForm.selectedClass" class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0">Select Travel Class</h5>
                    </div>
                    <div class="card-body">
                        <div class="row g-3">
                            <template x-for="[className, classData] in Object.entries(selectedTrain?.classes || {})" :key="className">
                                <div class="col-md-6">
                                    <div class="card h-100 class-option" 
                                         @click="selectClass(className, classData.fare)"
                                         :class="{'border-primary': bookingForm.selectedClass === className}">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-start mb-2">
                                                <h6 class="mb-0" x-text="className"></h6>
                                                <span class="badge" 
                                                      :class="{
                                                          'bg-success': classData.available === 'Available',
                                                          'bg-warning': classData.available.includes('RAC'),
                                                          'bg-danger': classData.available.includes('WL')
                                                      }" 
                                                      x-text="classData.available"></span>
                                            </div>
                                            <p class="mb-2">₹<span x-text="classData.fare"></span></p>
                                            <small class="text-muted"><span x-text="classData.seats"></span> seats available</small>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <!-- Booking Form -->
                <div x-show="bookingForm.selectedClass">
                    <form @submit.prevent="confirmBooking()">
                        <!-- Passenger Details -->
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="mb-0">Passenger Details</h5>
                            </div>
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Full Name *</label>
                                        <input type="text" class="form-control" x-model="bookingForm.passenger.name" required>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Age *</label>
                                        <input type="number" class="form-control" x-model="bookingForm.passenger.age" 
                                               min="1" max="120" required>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Gender *</label>
                                        <select class="form-select" x-model="bookingForm.passenger.gender" required>
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Phone Number *</label>
                                        <input type="tel" class="form-control" x-model="bookingForm.passenger.phone" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Email *</label>
                                        <input type="email" class="form-control" x-model="bookingForm.passenger.email" required>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Details -->
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5 class="mb-0">Payment Details</h5>
                            </div>
                            <div class="card-body">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Card Number *</label>
                                        <input type="text" class="form-control" x-model="bookingForm.payment.cardNumber" 
                                               placeholder="1234 5678 9012 3456" required>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">Expiry *</label>
                                        <input type="text" class="form-control" x-model="bookingForm.payment.expiry" 
                                               placeholder="MM/YY" required>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label">CVV *</label>
                                        <input type="text" class="form-control" x-model="bookingForm.payment.cvv" 
                                               placeholder="123" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Cardholder Name *</label>
                                        <input type="text" class="form-control" x-model="bookingForm.payment.cardName" required>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Booking Summary -->
                        <div class="card mb-4 border-success">
                            <div class="card-header bg-success text-white">
                                <h5 class="mb-0">Booking Summary</h5>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>Total Amount</strong>
                                        <div class="text-muted">Base fare + taxes</div>
                                    </div>
                                    <div class="h4 text-success mb-0">₹<span x-text="bookingForm.fare"></span></div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="d-flex gap-3 justify-content-end">
                            <button type="button" class="btn btn-outline-secondary" @click="showPage('search')">
                                ← Back to Search
                            </button>
                            <button type="submit" class="btn btn-success btn-lg">
                                💳 Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Confirmation Page -->
    <div x-show="currentPage === 'confirmation'" x-transition:enter="animate__animated animate__fadeIn" class="container py-4">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="text-center mb-4">
                    <div class="display-1 text-success">🎉</div>
                    <h2 class="text-success mb-3">Booking Confirmed!</h2>
                    <p class="lead">Your ticket has been successfully booked.</p>
                </div>

                <!-- Ticket Details -->
                <div x-show="confirmedBooking" class="card border-success">
                    <div class="card-header bg-success text-white text-center">
                        <h5 class="mb-0">Ticket Details</h5>
                    </div>
                    <div class="card-body">
                        <div class="text-center mb-3">
                            <h4 class="text-primary">PNR: <span x-text="confirmedBooking?.pnr"></span></h4>
                            <span class="badge bg-success">Confirmed</span>
                        </div>
                        
                        <div class="row g-3">
                            <div class="col-md-6">
                                <strong>Train:</strong> <span x-text="confirmedBooking?.trainName"></span>
                            </div>
                            <div class="col-md-6">
                                <strong>Train No:</strong> <span x-text="confirmedBooking?.trainNumber"></span>
                            </div>
                            <div class="col-md-6">
                                <strong>From:</strong> <span x-text="confirmedBooking?.from"></span>
                            </div>
                            <div class="col-md-6">
                                <strong>To:</strong> <span x-text="confirmedBooking?.to"></span>
                            </div>
                            <div class="col-md-6">
                                <strong>Date:</strong> <span x-text="dayjs(confirmedBooking?.date).format('DD MMM YYYY')"></span>
                            </div>
                            <div class="col-md-6">
                                <strong>Class:</strong> <span x-text="confirmedBooking?.class"></span>
                            </div>
                            <div class="col-md-6">
                                <strong>Passenger:</strong> <span x-text="confirmedBooking?.passenger?.name"></span>
                            </div>
                            <div class="col-md-6">
                                <strong>Total Fare:</strong> ₹<span x-text="confirmedBooking?.totalFare"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex gap-3 justify-content-center mt-4">
                    <button class="btn btn-primary" @click="showPage('search')">
                        🔍 Book Another Ticket
                    </button>
                    <button class="btn btn-outline-primary" @click="showPage('history')">
                        📋 View Booking History
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Booking History Page -->
    <div x-show="currentPage === 'history'" x-transition:enter="animate__animated animate__fadeIn" class="container py-4">
        <h2 class="text-center mb-4">Booking History</h2>

        <!-- Filters -->
        <div class="card mb-4">
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-3">
                        <label class="form-label">From Date</label>
                        <input type="date" class="form-control" x-model="historyFilters.fromDate" @input="applyFilters()">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">To Date</label>
                        <input type="date" class="form-control" x-model="historyFilters.toDate" @input="applyFilters()">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Train/PNR</label>
                        <input type="text" class="form-control" x-model="historyFilters.search" 
                               placeholder="Search by train name, number, or PNR" @input="applyFilters()">
                    </div>
                    <div class="col-md-3">
                        <label class="form-label">Status</label>
                        <select class="form-select" x-model="historyFilters.status" @change="applyFilters()">
                            <option value="">All Status</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="RAC">RAC</option>
                            <option value="Waitlisted">Waitlisted</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div class="mt-3">
                    <button class="btn btn-outline-secondary btn-sm" @click="resetFilters()">Reset Filters</button>
                </div>
            </div>
        </div>

        <!-- Bookings List -->
        <template x-for="booking in filteredBookings" :key="booking.pnr">
            <div class="card mb-3 shadow-sm">
                <div class="card-header cursor-pointer" @click="toggleBookingExpansion(booking.pnr)">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <h6 class="mb-1" x-text="booking.trainName + ' (' + booking.trainNumber + ')'"></h6>
                            <div class="d-flex gap-3 text-muted small">
                                <span>PNR: <span x-text="booking.pnr"></span></span>
                                <span x-text="booking.from + ' → ' + booking.to"></span>
                                <span x-text="dayjs(booking.date).format('DD MMM YYYY')"></span>
                                <span>Class: <span x-text="booking.class"></span></span>
                            </div>
                        </div>
                        <div class="col-md-4 text-end">
                            <span class="badge me-2" 
                                  :class="{
                                      'bg-success': booking.status === 'Confirmed',
                                      'bg-warning': booking.status === 'RAC',
                                      'bg-danger': booking.status === 'Waitlisted',
                                      'bg-secondary': booking.status === 'Cancelled'
                                  }" 
                                  x-text="booking.status"></span>
                            <strong class="text-primary">₹<span x-text="booking.totalFare"></span></strong>
                            <span class="ms-2" x-text="expandedBookings.includes(booking.pnr) ? '▲' : '▼'"></span>
                        </div>
                    </div>
                </div>

                <!-- Expanded Details -->
                <div x-show="expandedBookings.includes(booking.pnr)" 
                     x-transition:enter="animate__animated animate__slideInDown"
                     x-transition:leave="animate__animated animate__slideOutUp"
                     class="card-body border-top">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Journey Details</h6>
                            <p><strong>Date:</strong> <span x-text="dayjs(booking.date).format('DD MMM YYYY')"></span></p>
                            <p><strong>Departure:</strong> <span x-text="booking.departure"></span></p>
                            <p><strong>Arrival:</strong> <span x-text="booking.arrival"></span></p>
                            <p><strong>Duration:</strong> <span x-text="booking.duration"></span></p>
                            <p><strong>Coach:</strong> <span x-text="booking.coach"></span></p>
                        </div>
                        <div class="col-md-6">
                            <h6>Passenger Details</h6>
                            <p><strong>Name:</strong> <span x-text="booking.passenger?.name"></span></p>
                            <p><strong>Age:</strong> <span x-text="booking.passenger?.age"></span></p>
                            <p><strong>Gender:</strong> <span x-text="booking.passenger?.gender"></span></p>
                            <p><strong>Phone:</strong> <span x-text="booking.passenger?.phone"></span></p>
                            <p><strong>Booking Date:</strong> <span x-text="dayjs(booking.bookingDate).format('DD MMM YYYY')"></span></p>
                        </div>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-outline-primary btn-sm" @click="downloadTicket(booking.pnr)">
                            📄 Download Ticket
                        </button>
                        <button class="btn btn-outline-info btn-sm" @click="shareBooking(booking.pnr)">
                            📤 Share Details
                        </button>
                        <button x-show="booking.status === 'Confirmed' && dayjs(booking.date).isAfter(dayjs())" 
                                class="btn btn-outline-danger btn-sm" @click="cancelBooking(booking.pnr)">
                            ❌ Cancel
                        </button>
                    </div>
                </div>
            </div>
        </template>

        <!-- No Bookings -->
        <div x-show="filteredBookings.length === 0" class="text-center py-5">
            <h4>No bookings found</h4>
            <p class="text-muted">You haven't made any bookings yet or no bookings match your filters.</p>
        </div>
    </div>

    <!-- Day.js -->
    <script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.0/dayjs.min.js"></script>
    <!-- Custom JS -->
    <script src="app.js"></script>
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`:root {
  /* Primitive Color Tokens */
  --color-white: rgba(255, 255, 255, 1);
  --color-black: rgba(0, 0, 0, 1);
  --color-cream-50: rgba(252, 252, 249, 1);
  --color-cream-100: rgba(255, 255, 253, 1);
  --color-gray-200: rgba(245, 245, 245, 1);
  --color-gray-300: rgba(167, 169, 169, 1);
  --color-gray-400: rgba(119, 124, 124, 1);
  --color-slate-500: rgba(98, 108, 113, 1);
  --color-brown-600: rgba(94, 82, 64, 1);
  --color-charcoal-700: rgba(31, 33, 33, 1);
  --color-charcoal-800: rgba(38, 40, 40, 1);
  --color-slate-900: rgba(19, 52, 59, 1);
  --color-teal-300: rgba(50, 184, 198, 1);
  --color-teal-400: rgba(45, 166, 178, 1);
  --color-teal-500: rgba(33, 128, 141, 1);
  --color-teal-600: rgba(29, 116, 128, 1);
  --color-teal-700: rgba(26, 104, 115, 1);
  --color-teal-800: rgba(41, 150, 161, 1);
  --color-red-400: rgba(255, 84, 89, 1);
  --color-red-500: rgba(192, 21, 47, 1);
  --color-orange-400: rgba(230, 129, 97, 1);
  --color-orange-500: rgba(168, 75, 47, 1);

  /* RGB versions for opacity control */
  --color-brown-600-rgb: 94, 82, 64;
  --color-teal-500-rgb: 33, 128, 141;
  --color-slate-900-rgb: 19, 52, 59;
  --color-slate-500-rgb: 98, 108, 113;
  --color-red-500-rgb: 192, 21, 47;
  --color-red-400-rgb: 255, 84, 89;
  --color-orange-500-rgb: 168, 75, 47;
  --color-orange-400-rgb: 230, 129, 97;

  /* Background color tokens (Light Mode) */
  --color-bg-1: rgba(59, 130, 246, 0.08); /* Light blue */
  --color-bg-2: rgba(245, 158, 11, 0.08); /* Light yellow */
  --color-bg-3: rgba(34, 197, 94, 0.08); /* Light green */
  --color-bg-4: rgba(239, 68, 68, 0.08); /* Light red */
  --color-bg-5: rgba(147, 51, 234, 0.08); /* Light purple */
  --color-bg-6: rgba(249, 115, 22, 0.08); /* Light orange */
  --color-bg-7: rgba(236, 72, 153, 0.08); /* Light pink */
  --color-bg-8: rgba(6, 182, 212, 0.08); /* Light cyan */

  /* Semantic Color Tokens (Light Mode) */
  --color-background: var(--color-cream-50);
  --color-surface: var(--color-cream-100);
  --color-text: var(--color-slate-900);
  --color-text-secondary: var(--color-slate-500);
  --color-primary: var(--color-teal-500);
  --color-primary-hover: var(--color-teal-600);
  --color-primary-active: var(--color-teal-700);
  --color-secondary: rgba(var(--color-brown-600-rgb), 0.12);
  --color-secondary-hover: rgba(var(--color-brown-600-rgb), 0.2);
  --color-secondary-active: rgba(var(--color-brown-600-rgb), 0.25);
  --color-border: rgba(var(--color-brown-600-rgb), 0.2);
  --color-btn-primary-text: var(--color-cream-50);
  --color-card-border: rgba(var(--color-brown-600-rgb), 0.12);
  --color-card-border-inner: rgba(var(--color-brown-600-rgb), 0.12);
  --color-error: var(--color-red-500);
  --color-success: var(--color-teal-500);
  --color-warning: var(--color-orange-500);
  --color-info: var(--color-slate-500);
  --color-focus-ring: rgba(var(--color-teal-500-rgb), 0.4);
  --color-select-caret: rgba(var(--color-slate-900-rgb), 0.8);

  /* Common style patterns */
  --focus-ring: 0 0 0 3px var(--color-focus-ring);
  --focus-outline: 2px solid var(--color-primary);
  --status-bg-opacity: 0.15;
  --status-border-opacity: 0.25;
  --select-caret-light: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23134252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  --select-caret-dark: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f5f5f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");

  /* RGB versions for opacity control */
  --color-success-rgb: 33, 128, 141;
  --color-error-rgb: 192, 21, 47;
  --color-warning-rgb: 168, 75, 47;
  --color-info-rgb: 98, 108, 113;

  /* Typography */
  --font-family-base: "FKGroteskNeue", "Geist", "Inter", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: "Berkeley Mono", ui-monospace, SFMono-Regular, Menlo,
    Monaco, Consolas, monospace;
  --font-size-xs: 11px;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-md: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 18px;
  --font-size-2xl: 20px;
  --font-size-3xl: 24px;
  --font-size-4xl: 30px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 550;
  --font-weight-bold: 600;
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --letter-spacing-tight: -0.01em;

  /* Spacing */
  --space-0: 0;
  --space-1: 1px;
  --space-2: 2px;
  --space-4: 4px;
  --space-6: 6px;
  --space-8: 8px;
  --space-10: 10px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-base: 8px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.04),
    0 2px 4px -1px rgba(0, 0, 0, 0.02);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.04),
    0 4px 6px -2px rgba(0, 0, 0, 0.02);
  --shadow-inset-sm: inset 0 1px 0 rgba(255, 255, 255, 0.15),
    inset 0 -1px 0 rgba(0, 0, 0, 0.03);

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);

  /* Layout */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
}

/* Dark mode colors */
@media (prefers-color-scheme: dark) {
  :root {
    /* RGB versions for opacity control (Dark Mode) */
    --color-gray-400-rgb: 119, 124, 124;
    --color-teal-300-rgb: 50, 184, 198;
    --color-gray-300-rgb: 167, 169, 169;
    --color-gray-200-rgb: 245, 245, 245;

    /* Background color tokens (Dark Mode) */
    --color-bg-1: rgba(29, 78, 216, 0.15); /* Dark blue */
    --color-bg-2: rgba(180, 83, 9, 0.15); /* Dark yellow */
    --color-bg-3: rgba(21, 128, 61, 0.15); /* Dark green */
    --color-bg-4: rgba(185, 28, 28, 0.15); /* Dark red */
    --color-bg-5: rgba(107, 33, 168, 0.15); /* Dark purple */
    --color-bg-6: rgba(194, 65, 12, 0.15); /* Dark orange */
    --color-bg-7: rgba(190, 24, 93, 0.15); /* Dark pink */
    --color-bg-8: rgba(8, 145, 178, 0.15); /* Dark cyan */
    
    /* Semantic Color Tokens (Dark Mode) */
    --color-background: var(--color-charcoal-700);
    --color-surface: var(--color-charcoal-800);
    --color-text: var(--color-gray-200);
    --color-text-secondary: rgba(var(--color-gray-300-rgb), 0.7);
    --color-primary: var(--color-teal-300);
    --color-primary-hover: var(--color-teal-400);
    --color-primary-active: var(--color-teal-800);
    --color-secondary: rgba(var(--color-gray-400-rgb), 0.15);
    --color-secondary-hover: rgba(var(--color-gray-400-rgb), 0.25);
    --color-secondary-active: rgba(var(--color-gray-400-rgb), 0.3);
    --color-border: rgba(var(--color-gray-400-rgb), 0.3);
    --color-error: var(--color-red-400);
    --color-success: var(--color-teal-300);
    --color-warning: var(--color-orange-400);
    --color-info: var(--color-gray-300);
    --color-focus-ring: rgba(var(--color-teal-300-rgb), 0.4);
    --color-btn-primary-text: var(--color-slate-900);
    --color-card-border: rgba(var(--color-gray-400-rgb), 0.2);
    --color-card-border-inner: rgba(var(--color-gray-400-rgb), 0.15);
    --shadow-inset-sm: inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    --button-border-secondary: rgba(var(--color-gray-400-rgb), 0.2);
    --color-border-secondary: rgba(var(--color-gray-400-rgb), 0.2);
    --color-select-caret: rgba(var(--color-gray-200-rgb), 0.8);

    /* Common style patterns - updated for dark mode */
    --focus-ring: 0 0 0 3px var(--color-focus-ring);
    --focus-outline: 2px solid var(--color-primary);
    --status-bg-opacity: 0.15;
    --status-border-opacity: 0.25;
    --select-caret-light: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23134252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    --select-caret-dark: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f5f5f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");

    /* RGB versions for dark mode */
    --color-success-rgb: var(--color-teal-300-rgb);
    --color-error-rgb: var(--color-red-400-rgb);
    --color-warning-rgb: var(--color-orange-400-rgb);
    --color-info-rgb: var(--color-gray-300-rgb);
  }
}

/* Data attribute for manual theme switching */
[data-color-scheme="dark"] {
  /* RGB versions for opacity control (dark mode) */
  --color-gray-400-rgb: 119, 124, 124;
  --color-teal-300-rgb: 50, 184, 198;
  --color-gray-300-rgb: 167, 169, 169;
  --color-gray-200-rgb: 245, 245, 245;

  /* Colorful background palette - Dark Mode */
  --color-bg-1: rgba(29, 78, 216, 0.15); /* Dark blue */
  --color-bg-2: rgba(180, 83, 9, 0.15); /* Dark yellow */
  --color-bg-3: rgba(21, 128, 61, 0.15); /* Dark green */
  --color-bg-4: rgba(185, 28, 28, 0.15); /* Dark red */
  --color-bg-5: rgba(107, 33, 168, 0.15); /* Dark purple */
  --color-bg-6: rgba(194, 65, 12, 0.15); /* Dark orange */
  --color-bg-7: rgba(190, 24, 93, 0.15); /* Dark pink */
  --color-bg-8: rgba(8, 145, 178, 0.15); /* Dark cyan */
  
  /* Semantic Color Tokens (Dark Mode) */
  --color-background: var(--color-charcoal-700);
  --color-surface: var(--color-charcoal-800);
  --color-text: var(--color-gray-200);
  --color-text-secondary: rgba(var(--color-gray-300-rgb), 0.7);
  --color-primary: var(--color-teal-300);
  --color-primary-hover: var(--color-teal-400);
  --color-primary-active: var(--color-teal-800);
  --color-secondary: rgba(var(--color-gray-400-rgb), 0.15);
  --color-secondary-hover: rgba(var(--color-gray-400-rgb), 0.25);
  --color-secondary-active: rgba(var(--color-gray-400-rgb), 0.3);
  --color-border: rgba(var(--color-gray-400-rgb), 0.3);
  --color-error: var(--color-red-400);
  --color-success: var(--color-teal-300);
  --color-warning: var(--color-orange-400);
  --color-info: var(--color-gray-300);
  --color-focus-ring: rgba(var(--color-teal-300-rgb), 0.4);
  --color-btn-primary-text: var(--color-slate-900);
  --color-card-border: rgba(var(--color-gray-400-rgb), 0.15);
  --color-card-border-inner: rgba(var(--color-gray-400-rgb), 0.15);
  --shadow-inset-sm: inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  --color-border-secondary: rgba(var(--color-gray-400-rgb), 0.2);
  --color-select-caret: rgba(var(--color-gray-200-rgb), 0.8);

  /* Common style patterns - updated for dark mode */
  --focus-ring: 0 0 0 3px var(--color-focus-ring);
  --focus-outline: 2px solid var(--color-primary);
  --status-bg-opacity: 0.15;
  --status-border-opacity: 0.25;
  --select-caret-light: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23134252' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  --select-caret-dark: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f5f5f5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");

  /* RGB versions for dark mode */
  --color-success-rgb: var(--color-teal-300-rgb);
  --color-error-rgb: var(--color-red-400-rgb);
  --color-warning-rgb: var(--color-orange-400-rgb);
  --color-info-rgb: var(--color-gray-300-rgb);
}

[data-color-scheme="light"] {
  /* RGB versions for opacity control (light mode) */
  --color-brown-600-rgb: 94, 82, 64;
  --color-teal-500-rgb: 33, 128, 141;
  --color-slate-900-rgb: 19, 52, 59;
  
  /* Semantic Color Tokens (Light Mode) */
  --color-background: var(--color-cream-50);
  --color-surface: var(--color-cream-100);
  --color-text: var(--color-slate-900);
  --color-text-secondary: var(--color-slate-500);
  --color-primary: var(--color-teal-500);
  --color-primary-hover: var(--color-teal-600);
  --color-primary-active: var(--color-teal-700);
  --color-secondary: rgba(var(--color-brown-600-rgb), 0.12);
  --color-secondary-hover: rgba(var(--color-brown-600-rgb), 0.2);
  --color-secondary-active: rgba(var(--color-brown-600-rgb), 0.25);
  --color-border: rgba(var(--color-brown-600-rgb), 0.2);
  --color-btn-primary-text: var(--color-cream-50);
  --color-card-border: rgba(var(--color-brown-600-rgb), 0.12);
  --color-card-border-inner: rgba(var(--color-brown-600-rgb), 0.12);
  --color-error: var(--color-red-500);
  --color-success: var(--color-teal-500);
  --color-warning: var(--color-orange-500);
  --color-info: var(--color-slate-500);
  --color-focus-ring: rgba(var(--color-teal-500-rgb), 0.4);

  /* RGB versions for light mode */
  --color-success-rgb: var(--color-teal-500-rgb);
  --color-error-rgb: var(--color-red-500-rgb);
  --color-warning-rgb: var(--color-orange-500-rgb);
  --color-info-rgb: var(--color-slate-500-rgb);
}

/* Base styles */
html {
  font-size: var(--font-size-base);
  font-family: var(--font-family-base);
  line-height: var(--line-height-normal);
  color: var(--color-text);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Typography */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text);
  letter-spacing: var(--letter-spacing-tight);
}

h1 {
  font-size: var(--font-size-4xl);
}
h2 {
  font-size: var(--font-size-3xl);
}
h3 {
  font-size: var(--font-size-2xl);
}
h4 {
  font-size: var(--font-size-xl);
}
h5 {
  font-size: var(--font-size-lg);
}
h6 {
  font-size: var(--font-size-md);
}

p {
  margin: 0 0 var(--space-16) 0;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

a:hover {
  color: var(--color-primary-hover);
}

code,
pre {
  font-family: var(--font-family-mono);
  font-size: calc(var(--font-size-base) * 0.95);
  background-color: var(--color-secondary);
  border-radius: var(--radius-sm);
}

code {
  padding: var(--space-1) var(--space-4);
}

pre {
  padding: var(--space-16);
  margin: var(--space-16) 0;
  overflow: auto;
  border: 1px solid var(--color-border);
}

pre code {
  background: none;
  padding: 0;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-16);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-standard);
  border: none;
  text-decoration: none;
  position: relative;
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-btn-primary-text);
}

.btn--primary:hover {
  background: var(--color-primary-hover);
}

.btn--primary:active {
  background: var(--color-primary-active);
}

.btn--secondary {
  background: var(--color-secondary);
  color: var(--color-text);
}

.btn--secondary:hover {
  background: var(--color-secondary-hover);
}

.btn--secondary:active {
  background: var(--color-secondary-active);
}

.btn--outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.btn--outline:hover {
  background: var(--color-secondary);
}

.btn--sm {
  padding: var(--space-4) var(--space-12);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
}

.btn--lg {
  padding: var(--space-10) var(--space-20);
  font-size: var(--font-size-lg);
  border-radius: var(--radius-md);
}

.btn--full-width {
  width: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Form elements */
.form-control {
  display: block;
  width: 100%;
  padding: var(--space-8) var(--space-12);
  font-size: var(--font-size-md);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  transition: border-color var(--duration-fast) var(--ease-standard),
    box-shadow var(--duration-fast) var(--ease-standard);
}

textarea.form-control {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
}

select.form-control {
  padding: var(--space-8) var(--space-12);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: var(--select-caret-light);
  background-repeat: no-repeat;
  background-position: right var(--space-12) center;
  background-size: 16px;
  padding-right: var(--space-32);
}

/* Add a dark mode specific caret */
@media (prefers-color-scheme: dark) {
  select.form-control {
    background-image: var(--select-caret-dark);
  }
}

/* Also handle data-color-scheme */
[data-color-scheme="dark"] select.form-control {
  background-image: var(--select-caret-dark);
}

[data-color-scheme="light"] select.form-control {
  background-image: var(--select-caret-light);
}

.form-control:focus {
  border-color: var(--color-primary);
  outline: var(--focus-outline);
}

.form-label {
  display: block;
  margin-bottom: var(--space-8);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.form-group {
  margin-bottom: var(--space-16);
}

/* Card component */
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-card-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow var(--duration-normal) var(--ease-standard);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card__body {
  padding: var(--space-16);
}

.card__header,
.card__footer {
  padding: var(--space-16);
  border-bottom: 1px solid var(--color-card-border-inner);
}

/* Status indicators - simplified with CSS variables */
.status {
  display: inline-flex;
  align-items: center;
  padding: var(--space-6) var(--space-12);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.status--success {
  background-color: rgba(
    var(--color-success-rgb, 33, 128, 141),
    var(--status-bg-opacity)
  );
  color: var(--color-success);
  border: 1px solid
    rgba(var(--color-success-rgb, 33, 128, 141), var(--status-border-opacity));
}

.status--error {
  background-color: rgba(
    var(--color-error-rgb, 192, 21, 47),
    var(--status-bg-opacity)
  );
  color: var(--color-error);
  border: 1px solid
    rgba(var(--color-error-rgb, 192, 21, 47), var(--status-border-opacity));
}

.status--warning {
  background-color: rgba(
    var(--color-warning-rgb, 168, 75, 47),
    var(--status-bg-opacity)
  );
  color: var(--color-warning);
  border: 1px solid
    rgba(var(--color-warning-rgb, 168, 75, 47), var(--status-border-opacity));
}

.status--info {
  background-color: rgba(
    var(--color-info-rgb, 98, 108, 113),
    var(--status-bg-opacity)
  );
  color: var(--color-info);
  border: 1px solid
    rgba(var(--color-info-rgb, 98, 108, 113), var(--status-border-opacity));
}

/* Container layout */
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--space-16);
  padding-left: var(--space-16);
}

@media (min-width: 640px) {
  .container {
    max-width: var(--container-sm);
  }
}
@media (min-width: 768px) {
  .container {
    max-width: var(--container-md);
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: var(--container-lg);
  }
}
@media (min-width: 1280px) {
  .container {
    max-width: var(--container-xl);
  }
}

/* Utility classes */
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-4 {
  gap: var(--space-4);
}
.gap-8 {
  gap: var(--space-8);
}
.gap-16 {
  gap: var(--space-16);
}

.m-0 {
  margin: 0;
}
.mt-8 {
  margin-top: var(--space-8);
}
.mb-8 {
  margin-bottom: var(--space-8);
}
.mx-8 {
  margin-left: var(--space-8);
  margin-right: var(--space-8);
}
.my-8 {
  margin-top: var(--space-8);
  margin-bottom: var(--space-8);
}

.p-0 {
  padding: 0;
}
.py-8 {
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
}
.px-8 {
  padding-left: var(--space-8);
  padding-right: var(--space-8);
}
.py-16 {
  padding-top: var(--space-16);
  padding-bottom: var(--space-16);
}
.px-16 {
  padding-left: var(--space-16);
  padding-right: var(--space-16);
}

.block {
  display: block;
}
.hidden {
  display: none;
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

:focus-visible {
  outline: var(--focus-outline);
  outline-offset: 2px;
}

/* Dark mode specifics */
[data-color-scheme="dark"] .btn--outline {
  border: 1px solid var(--color-border-secondary);
}

@font-face {
  font-family: 'FKGroteskNeue';
  src: url('https://r2cdn.perplexity.ai/fonts/FKGroteskNeue.woff2')
    format('woff2');
}

/* END PERPLEXITY DESIGN SYSTEM */
/* Light Blue Navbar Theme */
.bg-light-blue {
    background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%) !important;
}

.navbar-light .navbar-brand,
.navbar-light .nav-link {
    color: white !important;
}

.navbar-light .nav-link:hover {
    color: #f0f8ff !important;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.navbar-light .nav-link.active {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border-radius: 4px;
    color: white !important;
}

.navbar-toggler {
    border-color: rgba(255, 255, 255, 0.3);
}

.navbar-toggler-icon {
    filter: invert(1);
}

/* Custom Bootstrap Overrides */
:root {
    --bs-primary: #4A90E2;
    --bs-primary-rgb: 74, 144, 226;
    --bs-success: #28a745;
    --bs-success-rgb: 40, 167, 69;
}

.btn-primary {
    background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
    border-color: #4A90E2;
}

.btn-primary:hover {
    background: linear-gradient(135deg, #357ABD 0%, #2E6BA8 100%);
    border-color: #357ABD;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
}

.btn-success {
    background: linear-gradient(135deg, #28a745 0%, #20963d 100%);
    border-color: #28a745;
}

.btn-success:hover {
    background: linear-gradient(135deg, #20963d 0%, #1e7e34 100%);
    border-color: #20963d;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

/* Card Enhancements */
.card {
    border: none;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.border-hover:hover {
    border-color: var(--bs-primary) !important;
}

.card-header {
    border-radius: 12px 12px 0 0 !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

/* Class Selection Cards */
.class-option {
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #e9ecef !important;
}

.class-option:hover {
    border-color: var(--bs-primary) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.2);
}

.class-option.border-primary {
    border-color: var(--bs-primary) !important;
    background-color: rgba(74, 144, 226, 0.05);
}

/* Form Enhancements */
.form-control:focus,
.form-select:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
}

.form-label {
    font-weight: 500;
    color: #495057;
    margin-bottom: 0.5rem;
}

/* Status Badges */
.badge {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
}

/* Train Card Enhancements */
.train-route {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.train-route .fa-arrow-right {
    font-size: 1.2rem;
}

/* Expandable Sections */
.cursor-pointer {
    cursor: pointer;
}

/* Animation Overrides */
.animate__animated {
    animation-duration: 0.5s;
}

.animate__slideInDown {
    animation-duration: 0.3s;
}

.animate__slideOutUp {
    animation-duration: 0.3s;
}

.animate__fadeIn {
    animation-duration: 0.4s;
}

/* Responsive Design */
@media (max-width: 768px) {
    .navbar-brand {
        font-size: 1.1rem;
    }
    
    .train-route {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
    }
    
    .train-route > div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .d-flex.gap-3 {
        flex-direction: column;
        gap: 0.5rem !important;
    }
    
    .btn-group-vertical .btn {
        margin-bottom: 0.5rem;
    }
}

@media (max-width: 576px) {
    .container {
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .card-body {
        padding: 1rem;
    }
    
    .display-4 {
        font-size: 2rem;
    }
    
    .btn-lg {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }
}

/* Loading States */
.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid var(--bs-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Seat Availability Colors */
.text-success {
    color: #28a745 !important;
}

.text-warning {
    color: #ffc107 !important;
}

.text-danger {
    color: #dc3545 !important;
}

/* Custom Utilities */
.bg-light-custom {
    background-color: #f8f9fa !important;
}

.border-light-custom {
    border-color: #e9ecef !important;
}

.text-primary-custom {
    color: var(--bs-primary) !important;
}

/* Booking Summary */
.booking-summary {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-left: 4px solid var(--bs-success);
}

/* Confirmation Page */
.confirmation-success {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
}

/* History Filters */
.history-filters {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* PNR Display */
.pnr-display {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    letter-spacing: 1px;
}

/* Hover Effects */
.card-header:hover {
    background-color: rgba(74, 144, 226, 0.05);
}

/* Focus States */
.btn:focus {
    box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: var(--bs-primary);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #357ABD;
}

/* Print Styles */
@media print {
    .navbar,
    .btn,
    .card-header button {
        display: none !important;
    }
    
    .card {
        border: 1px solid #000 !important;
        box-shadow: none !important;
    }
    
    .text-primary {
        color: #000 !important;
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    .card {
        background-color: #2d3748;
        color: #e2e8f0;
    }
    
    .form-control,
    .form-select {
        background-color: #4a5568;
        border-color: #718096;
        color: #e2e8f0;
    }
    
    .form-control:focus,
    .form-select:focus {
        background-color: #4a5568;
        border-color: var(--bs-primary);
        color: #e2e8f0;
    }
    
    .bg-light {
        background-color: #4a5568 !important;
    }
    
    .text-muted {
        color: #a0aec0 !important;
    }
}

/* Accessibility Improvements */
.btn:focus-visible {
    outline: 2px solid var(--bs-primary);
    outline-offset: 2px;
}

.card:focus-within {
    outline: 2px solid var(--bs-primary);
    outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
    .btn-primary {
        background: #000;
        border-color: #000;
        color: #fff;
    }
    
    .btn-success {
        background: #004d00;
        border-color: #004d00;
        color: #fff;
    }
    
    .text-primary {
        color: #000 !important;
    }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    .animate__animated {
        animation: none !important;
    }
    
    .btn:hover {
        transform: none;
    }
    
    .card:hover {
        transform: none;
    }
}

/* Custom Font Loading */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
}

.display-4 {
    font-weight: 700;
    color: var(--bs-primary);
}

/* Enhanced Visual Hierarchy */
.lead {
    font-size: 1.1rem;
    color: #6c757d;
}

/* Custom Spacing */
.py-custom {
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.my-custom {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

/* Icon Enhancements */
.icon-lg {
    font-size: 1.5rem;
}

.icon-xl {
    font-size: 2rem;
}

/* Success and Error States */
.form-control.is-valid {
    border-color: var(--bs-success);
    background-image: none;
}

.form-control.is-invalid {
    border-color: var(--bs-danger);
    background-image: none;
}

.valid-feedback {
    color: var(--bs-success);
}

.invalid-feedback {
    color: var(--bs-danger);
}

/* Loading Overlay */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

/* Toast Notifications */
.toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1050;
}

/* Custom Border Radius */
.rounded-custom {
    border-radius: 12px !important;
}

.rounded-lg-custom {
    border-radius: 16px !important;
}

/* Box Shadow Utilities */
.shadow-custom {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.shadow-lg-custom {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

/* Gradient Backgrounds */
.bg-gradient-primary {
    background: linear-gradient(135deg, var(--bs-primary) 0%, #357ABD 100%) !important;
    color: white;
}

.bg-gradient-success {
    background: linear-gradient(135deg, var(--bs-success) 0%, #20963d 100%) !important;
    color: white;
}

/* Final Responsive Adjustments */
@media (max-width: 768px) {
    .display-1 {
        font-size: 3rem;
    }
    
    .h4 {
        font-size: 1.3rem;
    }
    
    .btn-lg {
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
    }
    
    .container {
        padding-left: 15px;
        padding-right: 15px;
    }
}

@media (max-width: 576px) {
    .card-body {
        padding: 1rem 0.75rem;
    }
    
    .btn-group-mobile .btn {
        width: 100%;
        margin-bottom: 0.5rem;
    }
    
    .table-responsive {
        border: none;
    }
}`);

  const [jsCode, setJsCode] = useState(`// Railway Booking System - Alpine.js Application
function bookingApp() {
    return {
        // Application state
        currentPage: 'home',
        searchPerformed: false,
        expandedTrains: [],
        expandedBookings: [],
        
        // Search form data
        searchForm: {
            from: '',
            to: '',
            date: ''
        },
        
        // Search results
        searchResults: [],
        
        // Selected train for booking
        selectedTrain: null,
        
        // Booking form data
        bookingForm: {
            selectedClass: '',
            fare: 0,
            passenger: {
                name: '',
                age: '',
                gender: '',
                phone: '',
                email: ''
            },
            payment: {
                cardNumber: '',
                expiry: '',
                cvv: '',
                cardName: ''
            }
        },
        
        // Confirmed booking
        confirmedBooking: null,
        
        // Booking history
        bookings: [],
        filteredBookings: [],
        
        // History filters
        historyFilters: {
            fromDate: '',
            toDate: '',
            search: '',
            status: ''
        },
        
        // Static data
        stations: [
            "New Delhi", "Mumbai Central", "Chandigarh", "Bangalore", "Chennai Central",
            "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Patna",
            "Bhopal", "Indore", "Nagpur", "Coimbatore", "Kochi", "Thiruvananthapuram",
            "Guwahati", "Bhubaneswar", "Amritsar"
        ],
        
        trains: [
            {
                "trainNumber": "12301",
                "trainName": "Rajdhani Express",
                "from": "New Delhi",
                "to": "Mumbai Central",
                "departure": "16:55",
                "arrival": "08:35",
                "duration": "15h 40m",
                "distance": "1384 km",
                "runsOn": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                "classes": {
                    "1A": { "available": "Available", "fare": 4850, "seats": 18 },
                    "2A": { "available": "Available", "fare": 2890, "seats": 54 },
                    "3A": { "available": "RAC 5", "fare": 2050, "seats": 64 }
                }
            },
            {
                "trainNumber": "12002",
                "trainName": "Shatabdi Express",
                "from": "New Delhi",
                "to": "Chandigarh",
                "departure": "07:20",
                "arrival": "10:45",
                "duration": "3h 25m",
                "distance": "259 km",
                "runsOn": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                "classes": {
                    "CC": { "available": "Available", "fare": 685, "seats": 78 },
                    "EC": { "available": "Available", "fare": 1365, "seats": 20 }
                }
            },
            {
                "trainNumber": "12626",
                "trainName": "Karnataka Express",
                "from": "New Delhi",
                "to": "Bangalore",
                "departure": "20:00",
                "arrival": "04:00+2",
                "duration": "32h 00m",
                "distance": "2444 km",
                "runsOn": ["Mon", "Wed", "Sat"],
                "classes": {
                    "1A": { "available": "WL 12", "fare": 5680, "seats": 18 },
                    "2A": { "available": "Available", "fare": 3420, "seats": 54 },
                    "3A": { "available": "Available", "fare": 2380, "seats": 64 },
                    "SL": { "available": "Available", "fare": 985, "seats": 72 }
                }
            }
        ],

        // Sample bookings for demo
        sampleBookings: [
            {
                "pnr": "8541236970",
                "trainNumber": "12301",
                "trainName": "Rajdhani Express",
                "from": "New Delhi",
                "to": "Mumbai Central",
                "date": "2025-08-20",
                "departure": "16:55",
                "arrival": "08:35",
                "duration": "15h 40m",
                "class": "2A",
                "coach": "A1",
                "status": "Confirmed",
                "totalFare": 2890,
                "bookingDate": "2025-08-15",
                "bookingTime": "14:30",
                "passenger": {
                    "name": "Rahul Sharma",
                    "age": 28,
                    "gender": "Male",
                    "phone": "+91 9876543210",
                    "email": "rahul.sharma@email.com"
                }
            },
            {
                "pnr": "2847593610",
                "trainNumber": "12002",
                "trainName": "Shatabdi Express",
                "from": "New Delhi",
                "to": "Chandigarh",
                "date": "2025-08-18",
                "departure": "07:20",
                "arrival": "10:45",
                "duration": "3h 25m",
                "class": "CC",
                "coach": "C2",
                "status": "Confirmed",
                "totalFare": 685,
                "bookingDate": "2025-08-12",
                "bookingTime": "09:15",
                "passenger": {
                    "name": "Priya Kumar",
                    "age": 25,
                    "gender": "Female",
                    "phone": "+91 9876543211",
                    "email": "priya.kumar@email.com"
                }
            },
            {
                "pnr": "1926384750",
                "trainNumber": "12626",
                "trainName": "Karnataka Express",
                "from": "New Delhi",
                "to": "Bangalore",
                "date": "2025-08-25",
                "departure": "20:00",
                "arrival": "04:00+2",
                "duration": "32h 00m",
                "class": "3A",
                "coach": "B4",
                "status": "RAC",
                "totalFare": 2380,
                "bookingDate": "2025-08-14",
                "bookingTime": "16:45",
                "passenger": {
                    "name": "Amit Patel",
                    "age": 32,
                    "gender": "Male",
                    "phone": "+91 9876543212",
                    "email": "amit.patel@email.com"
                }
            }
        ],

        // Initialize the application
        init() {
            console.log('Initializing Railway Booking App...');
            
            // Set minimum date for search
            this.searchForm.date = dayjs().format('YYYY-MM-DD');
            
            // Load booking history from localStorage
            this.loadBookingHistory();
            
            // Apply initial filters
            this.applyFilters();
            
            console.log('App initialized successfully');
        },

        // Navigation methods
        showPage(page) {
            console.log('Navigating to page:', page);
            this.currentPage = page;
            
            // Reset some state when navigating
            if (page === 'search') {
                this.searchPerformed = false;
                this.expandedTrains = [];
            } else if (page === 'booking' && !this.selectedTrain) {
                // Redirect to search if no train selected
                this.currentPage = 'search';
                alert('Please select a train first');
            } else if (page === 'history') {
                this.applyFilters();
            }
        },

        // Search functionality
        performSearch() {
            console.log('Performing search...', this.searchForm);
            
            // Validation
            if (!this.searchForm.from || !this.searchForm.to || !this.searchForm.date) {
                alert('Please fill all search fields');
                return;
            }
            
            if (this.searchForm.from === this.searchForm.to) {
                alert('Origin and destination cannot be the same');
                return;
            }
            
            // Filter trains based on route
            this.searchResults = this.trains.filter(train => 
                train.from === this.searchForm.from && train.to === this.searchForm.to
            );
            
            this.searchPerformed = true;
            this.expandedTrains = [];
            
            console.log('Search completed. Found', this.searchResults.length, 'trains');
            
            if (this.searchResults.length > 0) {
                console.log(\`Found \${this.searchResults.length} train(s) for your route\`);
            } else {
                console.log('No trains found for the selected route');
            }
        },

        // Train details expansion
        toggleTrainDetails(trainNumber) {
            console.log('Toggling details for train:', trainNumber);
            
            const index = this.expandedTrains.indexOf(trainNumber);
            if (index > -1) {
                this.expandedTrains.splice(index, 1);
            } else {
                this.expandedTrains.push(trainNumber);
            }
        },

        // Train selection for booking (renamed from selectTrainForBooking)
        startBooking(train) {
            console.log('Starting booking for train:', train.trainNumber);
            
            this.selectedTrain = train;
            this.bookingForm = {
                selectedClass: '',
                fare: 0,
                passenger: {
                    name: '',
                    age: '',
                    gender: '',
                    phone: '',
                    email: ''
                },
                payment: {
                    cardNumber: '',
                    expiry: '',
                    cvv: '',
                    cardName: ''
                }
            };
            
            this.showPage('booking');
            console.log('Train selected. Please choose your travel class.');
        },

        // Class selection
        selectClass(className, fare) {
            console.log('Selecting class:', className, 'Fare:', fare);
            
            this.bookingForm.selectedClass = className;
            this.bookingForm.fare = fare;
            
            console.log(\`\${className} class selected - ₹\${fare}\`);
        },

        // Booking confirmation
        confirmBooking() {
            console.log('Confirming booking...', this.bookingForm);
            
            // Validate passenger details
            const passenger = this.bookingForm.passenger;
            if (!passenger.name || !passenger.age || !passenger.gender || 
                !passenger.phone || !passenger.email) {
                alert('Please fill all passenger details');
                return;
            }
            
            // Basic age validation
            if (passenger.age < 1 || passenger.age > 120) {
                alert('Please enter a valid age (1-120)');
                return;
            }
            
            // Basic phone validation
            if (passenger.phone.length < 10) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Basic email validation
            if (!passenger.email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Validate payment details
            const payment = this.bookingForm.payment;
            if (!payment.cardNumber || !payment.expiry || !payment.cvv || !payment.cardName) {
                alert('Please fill all payment details');
                return;
            }
            
            // Basic card number validation (should be 16 digits)
            const cardNumberOnly = payment.cardNumber.replace(/\\s/g, '');
            if (cardNumberOnly.length < 12 || cardNumberOnly.length > 19) {
                alert('Please enter a valid card number');
                return;
            }
            
            // Basic expiry validation (MM/YY format)
            if (!/^\\d{2}\\/\\d{2}$/.test(payment.expiry)) {
                alert('Please enter expiry in MM/YY format');
                return;
            }
            
            // Basic CVV validation
            if (payment.cvv.length < 3 || payment.cvv.length > 4) {
                alert('Please enter a valid CVV');
                return;
            }
            
            // Generate PNR
            const pnr = this.generatePNR();
            
            // Create booking object
            const booking = {
                pnr: pnr,
                trainNumber: this.selectedTrain.trainNumber,
                trainName: this.selectedTrain.trainName,
                from: this.selectedTrain.from,
                to: this.selectedTrain.to,
                date: this.searchForm.date,
                departure: this.selectedTrain.departure,
                arrival: this.selectedTrain.arrival,
                duration: this.selectedTrain.duration,
                class: this.bookingForm.selectedClass,
                coach: this.generateCoach(),
                status: 'Confirmed',
                totalFare: this.bookingForm.fare,
                bookingDate: dayjs().format('YYYY-MM-DD'),
                bookingTime: dayjs().format('HH:mm'),
                passenger: { ...this.bookingForm.passenger }
            };
            
            // Add to bookings
            this.bookings.unshift(booking);
            this.saveBookingHistory();
            
            // Set confirmed booking for display
            this.confirmedBooking = booking;
            
            // Navigate to confirmation
            this.showPage('confirmation');
            
            console.log('Booking confirmed:', booking);
        },

        // Booking history management
        loadBookingHistory() {
            try {
                const saved = localStorage.getItem('railwayBookings');
                if (saved) {
                    this.bookings = JSON.parse(saved);
                    console.log('Loaded', this.bookings.length, 'bookings from localStorage');
                } else {
                    // Load sample data for demo
                    this.bookings = [...this.sampleBookings];
                    this.saveBookingHistory();
                    console.log('Loaded sample bookings for demo');
                }
            } catch (error) {
                console.error('Error loading booking history:', error);
                this.bookings = [...this.sampleBookings];
            }
        },

        saveBookingHistory() {
            try {
                localStorage.setItem('railwayBookings', JSON.stringify(this.bookings));
                console.log('Booking history saved to localStorage');
            } catch (error) {
                console.error('Error saving booking history:', error);
            }
        },

        // History filtering
        applyFilters() {
            console.log('Applying filters:', this.historyFilters);
            
            let filtered = [...this.bookings];
            
            // Date range filter
            if (this.historyFilters.fromDate) {
                filtered = filtered.filter(booking => 
                    dayjs(booking.date).isSameOrAfter(dayjs(this.historyFilters.fromDate))
                );
            }
            
            if (this.historyFilters.toDate) {
                filtered = filtered.filter(booking => 
                    dayjs(booking.date).isSameOrBefore(dayjs(this.historyFilters.toDate))
                );
            }
            
            // Search filter (train name, number, or PNR)
            if (this.historyFilters.search) {
                const search = this.historyFilters.search.toLowerCase();
                filtered = filtered.filter(booking => 
                    booking.trainName.toLowerCase().includes(search) ||
                    booking.trainNumber.toLowerCase().includes(search) ||
                    booking.pnr.toLowerCase().includes(search)
                );
            }
            
            // Status filter
            if (this.historyFilters.status) {
                filtered = filtered.filter(booking => 
                    booking.status === this.historyFilters.status
                );
            }
            
            this.filteredBookings = filtered;
            console.log('Filtered bookings:', filtered.length, 'of', this.bookings.length);
        },

        resetFilters() {
            console.log('Resetting filters');
            
            this.historyFilters = {
                fromDate: '',
                toDate: '',
                search: '',
                status: ''
            };
            
            this.expandedBookings = [];
            this.applyFilters();
            
            console.log('Filters reset');
        },

        // Booking expansion in history
        toggleBookingExpansion(pnr) {
            console.log('Toggling booking expansion for PNR:', pnr);
            
            const index = this.expandedBookings.indexOf(pnr);
            if (index > -1) {
                this.expandedBookings.splice(index, 1);
            } else {
                this.expandedBookings.push(pnr);
            }
        },

        // Booking actions
        downloadTicket(pnr) {
            const booking = this.bookings.find(b => b.pnr === pnr);
            if (!booking) return;
            
            console.log('Downloading ticket for PNR:', pnr);
            
            const ticketData = \`
RAILWAY TICKET
==============

PNR: \${booking.pnr}
Status: \${booking.status}

Train: \${booking.trainName} (\${booking.trainNumber})
Route: \${booking.from} → \${booking.to}
Date: \${dayjs(booking.date).format('DD MMM YYYY')}
Departure: \${booking.departure}
Arrival: \${booking.arrival}
Duration: \${booking.duration}

Class: \${booking.class}
Coach: \${booking.coach}

Passenger: \${booking.passenger.name}
Age: \${booking.passenger.age}
Gender: \${booking.passenger.gender}
Phone: \${booking.passenger.phone}
Email: \${booking.passenger.email}

Total Fare: ₹\${booking.totalFare}

Booking Date: \${dayjs(booking.bookingDate).format('DD MMM YYYY')} \${booking.bookingTime}

Thank you for traveling with us!
            \`.trim();
            
            // Create and download file
            try {
                const blob = new Blob([ticketData], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = \`ticket-\${pnr}.txt\`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                
                alert('Ticket downloaded successfully!');
            } catch (error) {
                console.error('Download failed:', error);
                alert('Download failed. Please try again.');
            }
        },

        shareBooking(pnr) {
            const booking = this.bookings.find(b => b.pnr === pnr);
            if (!booking) return;
            
            console.log('Sharing booking for PNR:', pnr);
            
            const shareText = \`🚂 Railway Booking Details

PNR: \${booking.pnr}
Train: \${booking.trainName} (\${booking.trainNumber})
Route: \${booking.from} → \${booking.to}
Date: \${dayjs(booking.date).format('DD MMM YYYY')}
Class: \${booking.class}
Status: \${booking.status}
Passenger: \${booking.passenger.name}
Total Fare: ₹\${booking.totalFare}

Thank you for choosing our railway service!\`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Railway Booking Details',
                    text: shareText
                }).catch(() => this.fallbackShare(shareText));
            } else {
                this.fallbackShare(shareText);
            }
        },

        fallbackShare(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Booking details copied to clipboard!');
                }).catch(() => {
                    this.showAlert('Booking Details', text);
                });
            } else {
                this.showAlert('Booking Details', text);
            }
        },

        cancelBooking(pnr) {
            const booking = this.bookings.find(b => b.pnr === pnr);
            if (!booking) return;
            
            console.log('Cancelling booking for PNR:', pnr);
            
            if (confirm(\`Are you sure you want to cancel booking PNR: \${pnr}?\\n\\nThis action cannot be undone.\`)) {
                booking.status = 'Cancelled';
                this.saveBookingHistory();
                this.applyFilters();
                
                alert(\`Booking \${pnr} cancelled successfully. Refund will be processed within 7-10 working days.\`);
            }
        },

        // Utility methods
        generatePNR() {
            return Math.random().toString().substr(2, 10);
        },

        generateCoach() {
            const coaches = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'S1', 'S2'];
            return coaches[Math.floor(Math.random() * coaches.length)];
        },

        showAlert(title, message) {
            alert(\`\${title}\\n\\n\${message}\`);
        }
    }
}

// Ensure dayjs is available globally
window.dayjs = dayjs || (() => {
    console.warn('dayjs not loaded, using fallback');
    return {
        format: (fmt) => new Date().toISOString().split('T')[0],
        isAfter: () => false,
        isSameOrAfter: () => true,
        isSameOrBefore: () => true
    };
});

console.log('Railway Booking System - Alpine.js App Loaded');
console.log('Current time:', dayjs().format('YYYY-MM-DD HH:mm:ss'));`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Code className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Code Display & Copy</h1>
              <p className="text-gray-600 mt-1">Easily view, edit, and copy your HTML, CSS, and JavaScript code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <CodeBlock
            title="HTML Structure"
            language="HTML"
            code={htmlCode}
            icon={<FileText size={24} />}
            bgColor="bg-gradient-to-r from-orange-500 to-red-500"
            onCodeChange={setHtmlCode}
          />
          
          <CodeBlock
            title="CSS Styling"
            language="CSS"
            code={cssCode}
            icon={<Palette size={24} />}
            bgColor="bg-gradient-to-r from-blue-500 to-purple-600"
            onCodeChange={setCssCode}
          />
          
          <CodeBlock
            title="JavaScript Logic"
            language="JavaScript"
            code={jsCode}
            icon={<Code size={24} />}
            bgColor="bg-gradient-to-r from-yellow-500 to-green-500"
            onCodeChange={setJsCode}
          />
        </div>
        
        {/* Instructions */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="text-blue-600" />
            How to Use
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Edit Your Code</h3>
              <p>Click the "Edit" button in any section to modify your HTML, CSS, or JavaScript code directly in the browser.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Copy className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Copy with One Click</h3>
              <p>Use the copy button in each section header to instantly copy the entire code block to your clipboard.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <Check className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Use Anywhere</h3>
              <p>Paste your copied code into your IDE, text editor, or share it with others. Perfect for tutorials and documentation.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            Built with React and Tailwind CSS • Perfect for developers and educators
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;