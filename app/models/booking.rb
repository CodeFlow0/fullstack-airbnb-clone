class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :property
  has_many :charges

  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :user, presence: true
  validates :property, presence: true

  before_validation :check_start_date_smaller_than_end_date
  before_validation :check_availability

  def is_paid?
    charges.pluck(:complete).include?(true)
  end

  private

  def check_start_date_smaller_than_end_date
    raise ArgumentError, 'start date cannot be larger than end date' if start_date > end_date
  end

  def check_availability
    overlapped_bookings = property.bookings.where('start_date < ? AND end_date > ? ', end_date, start_date)
    exact_booking = property.bookings.where('start_date = ? AND end_date = ? ', start_date, end_date)

    if overlapped_bookings.count > 0 || exact_booking.count > 0
      message = 'date range overlaps with other bookings'
      puts message
      raise ArgumentError, message
    end
  end
end
